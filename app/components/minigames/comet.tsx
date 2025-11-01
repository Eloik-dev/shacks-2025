import React, { useEffect } from "react";
import { MinigamesContext } from "~/context/minigames/MinigamesContext";

type Ast = {
  id: number;
  x: number;
  vx: number;
  y: number;
  vy: number;
  r: number;
  alive: boolean;
  hitShip?: boolean;
  baseSpeed?: number;
  startAt?: number;
  spawnDist?: number;
  started?: boolean;
  targeted?: boolean;
  shape?: string; // SVG path
};

const NUM_AST = 10;
const GAME_W = 800;
const GAME_H = 600;

const Comet: React.FC = () => {
  const { nextLevel, updateDescription } = React.useContext(MinigamesContext);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = React.useState<number>(GAME_W);
  const [height, setHeight] = React.useState<number>(GAME_H);
  // center is in container-local coordinates (0..width, 0..height)
  const center = React.useRef<{ x: number; y: number }>({ x: GAME_W / 2, y: GAME_H / 2 });
  const shipR = 28;
  // ship is the firing origin

  const [asteroids, setAsteroids] = React.useState<Ast[]>([]);
  const missilesRef = React.useRef<any[]>([]);
  const [missiles, setMissiles] = React.useState<any[]>([]);
  const explosionsRef = React.useRef<any[]>([]);
  const [explosions, setExplosions] = React.useState<any[]>([]);
  const astRef = React.useRef<Ast[]>([]);
  const MISSILE_SPEED = 520; // px/sec
  const MISSILE_R = 4;
  const MISSILE_TTL = 2200; // ms
  const rafRef = React.useRef<number | null>(null);
  const lastRef = React.useRef<number | null>(null);
  const [running, setRunning] = React.useState<boolean>(true);
  const [message, setMessage] = React.useState<string>("À vous de jouer — protégez le vaisseau");
  const [ended, setEnded] = React.useState<null | "win" | "lose">(null);
  // no shield angle needed — firing is on click

  useEffect(() => {
    updateDescription("Protégez le vaisseau spatial pour prouver que vous êtes humain.");
  }, [updateDescription]);

  // fixed game area size (center coordinates are relative to the container)
  React.useEffect(() => {
    setWidth(GAME_W);
    setHeight(GAME_H);
    // if we can read the container rect, center relative to it; otherwise fallback
    const rect = containerRef.current?.getBoundingClientRect();
    center.current = rect ? { x: rect.width / 2, y: rect.height / 2 } : { x: GAME_W / 2, y: GAME_H / 2 };
  }, []);

  // spawn asteroids
  React.useEffect(() => {
    const arr: Ast[] = [];
    const spawnBase = Math.max(GAME_W, GAME_H) * 0.9;
    const cx0 = center.current.x || GAME_W / 2;
    const cy0 = center.current.y || GAME_H / 2;
    const now = performance.now();
    for (let i = 0; i < NUM_AST; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spawnDist = spawnBase + Math.random() * 200;
      const cx = cx0 + Math.cos(angle) * spawnDist;
      const cy = cy0 + Math.sin(angle) * spawnDist;
      const dx = cx0 - cx;
      const dy = cy0 - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const baseSpeed = 60 + Math.random() * 140; // px/sec
      // stagger start times so fewer asteroids arrive together
      const delay = i * 220 + Math.random() * 300; // ms
      const startAt = now + delay;
      const vx = (dx / dist) * baseSpeed;
      const vy = (dy / dist) * baseSpeed;
      // generate a jagged polygon path for visual asteroid
      const rad = 8 + Math.random() * 12;
      const pts = 7 + Math.floor(Math.random() * 3);
      const segs: string[] = [];
      for (let p = 0; p < pts; p++) {
        const aa = (p / pts) * Math.PI * 2;
        const rr = (Math.random() * 0.4 + 0.8) * rad;
        const px = Math.cos(aa) * rr;
        const py = Math.sin(aa) * rr;
        segs.push(`${px},${py}`);
      }
      const shape = `M ${segs.join(" L ")} Z`;
      arr.push({ id: i, x: cx, y: cy, vx, vy, r: rad, alive: true, baseSpeed, startAt, spawnDist, started: false, targeted: false, shape });
    }
    astRef.current = arr;
    setAsteroids([...arr]);
    setRunning(true);
    setEnded(null);
    setMessage("À vous de jouer — protégez le vaisseau");
    lastRef.current = null;
  }, []);

  // main loop
  React.useEffect(() => {
    function step(ts: number) {
      if (!lastRef.current) lastRef.current = ts;
      const dt = Math.min(40, ts - lastRef.current) / 1000; // seconds, clamp
      lastRef.current = ts;
      if (running && ended === null) {
        const a = astRef.current.map((ast) => {
          if (!ast.alive) return ast;
          // not started yet -> wait until its startAt
          if (ast.startAt && ts < ast.startAt) return ast;
          const nx0 = ast.x;
          const ny0 = ast.y;
          // dynamic speed: slow down when approaching center
          const cx = center.current.x;
          const cy = center.current.y;
          const dx0 = cx - nx0;
          const dy0 = cy - ny0;
          const dist0 = Math.sqrt(dx0 * dx0 + dy0 * dy0) || 1;
          const spawnDist = ast.spawnDist || Math.max(GAME_W, GAME_H) * 0.9;
          const speedFactor = Math.max(0.25, dist0 / spawnDist);
          const speed = (ast.baseSpeed || Math.sqrt(ast.vx * ast.vx + ast.vy * ast.vy)) * speedFactor;
          const vx = (dx0 / dist0) * speed;
          const vy = (dy0 / dist0) * speed;
          const nx = nx0 + vx * dt;
          const ny = ny0 + vy * dt;
          // mark started
          const started = true;

          const dx = nx - cx;
          const dy = ny - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // check shield collision: if within radial band and angle inside arc
          // no shield/auto-targeting — player fires by clicking

          // check ship collision
          if (dist <= shipR + ast.r) {
            // hit ship -> lose
            setEnded("lose");
            setMessage("PERDANT");
            return { ...ast, x: nx, y: ny, alive: false, hitShip: true, started };
          }

          return { ...ast, x: nx, y: ny, vx, vy, started };
        });
        // (no automatic firing here; missiles spawn from click handler)
        astRef.current = a;
        setAsteroids(a);

        // update missiles
        const ms = missilesRef.current.map((m) => {
          if (!m.alive) return m;
          const nx = m.x + m.vx * dt;
          const ny = m.y + m.vy * dt;
          m.x = nx;
          m.y = ny;
          m.ttl -= dt * 1000;
          if (m.ttl <= 0) {
            m.alive = false;
          }
          return m;
        });
        // collisions missile->asteroid
        for (const m of ms) {
          if (!m.alive) continue;
          for (const ast of a) {
            if (!ast.alive) continue;
            const dxm = ast.x - m.x;
            const dym = ast.y - m.y;
            const dm = Math.sqrt(dxm * dxm + dym * dym);
            if (dm <= ast.r + m.r) {
              ast.alive = false;
              m.alive = false;
              // spawn explosion at collision
              const ex = (ast.x + m.x) / 2;
              const ey = (ast.y + m.y) / 2;
              const expl = { id: Math.random(), x: ex, y: ey, r: Math.max(ast.r, 12), ttl: 450, life: 450 };
              explosionsRef.current.push(expl);
              setExplosions(explosionsRef.current.slice());
            }
          }
        }
        missilesRef.current = ms.filter((m) => m.alive);
        setMissiles(missilesRef.current.slice());

        // update explosions
        const exs = explosionsRef.current.map((ex) => {
          ex.ttl -= dt * 1000;
          return ex;
        }).filter((ex) => ex.ttl > 0);
        explosionsRef.current = exs;
        setExplosions(exs.slice());

        // if any asteroid hit ship: stop
        if (a.some((s) => s.hitShip)) {
          setRunning(false);
          return;
        }

        // if all asteroids are dead (blocked) -> win
        if (a.every((s) => !s.alive)) {
          setEnded("win");
          setMessage("🎉 Succès — vous avez protégé le vaisseau !");
          setRunning(false);
          nextLevel();
          return;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, ended]);

  // clicking will fire from the ship; no pointer tracking needed

  function shootAt(tx: number, ty: number) {
    const cx = center.current.x;
    // spawn missiles slightly below ship center so they appear from the rocket's base
    const cy = center.current.y + shipR * 0.6;
    const dx = tx - cx;
    const dy = ty - cy;
    const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
    const vx = (dx / dist) * MISSILE_SPEED;
    const vy = (dy / dist) * MISSILE_SPEED;
    const m = { id: Math.random(), x: cx, y: cy, vx, vy, r: MISSILE_R, ttl: MISSILE_TTL, alive: true };
    missilesRef.current.push(m);
    setMissiles(missilesRef.current.slice());
  }

  function restart() {
    const arr: Ast[] = [];
    const spawnBase = Math.max(GAME_W, GAME_H) * 0.9;
    const cx0 = center.current.x || GAME_W / 2;
    const cy0 = center.current.y || GAME_H / 2;
    const now = performance.now();
    const spawnBase2 = spawnBase;
    for (let i = 0; i < NUM_AST; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spawnDist = spawnBase2 + Math.random() * 200;
      const cx = cx0 + Math.cos(angle) * spawnDist;
      const cy = cy0 + Math.sin(angle) * spawnDist;
      const dx = cx0 - cx;
      const dy = cy0 - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const baseSpeed = 60 + Math.random() * 140; // px/sec
      const delay = i * 220 + Math.random() * 300;
      const startAt = now + delay;
      const vx = (dx / dist) * baseSpeed;
      const vy = (dy / dist) * baseSpeed;
      // jagged shape and radius
      const rad = 8 + Math.random() * 12;
      const pts = 7 + Math.floor(Math.random() * 3);
      const segs: string[] = [];
      for (let p = 0; p < pts; p++) {
        const aa = (p / pts) * Math.PI * 2;
        const rr = (Math.random() * 0.4 + 0.8) * rad;
        const px = Math.cos(aa) * rr;
        const py = Math.sin(aa) * rr;
        segs.push(`${px},${py}`);
      }
      const shape = `M ${segs.join(" L ")} Z`;
      arr.push({ id: i, x: cx, y: cy, vx, vy, r: rad, alive: true, baseSpeed, startAt, spawnDist, started: false, targeted: false, shape });
    }
    astRef.current = arr;
    setAsteroids([...arr]);
    setRunning(true);
    setEnded(null);
    setMessage("À vous de jouer — protégez le vaisseau");
    lastRef.current = null;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24, background: '#000' }}>
      <div
        ref={containerRef}
        onClick={(e) => {
          // compute click position relative to container and shoot there
          const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          shootAt(x, y);
        }}
        style={{ width, height, position: 'relative', background: '#000', color: '#fff', overflow: 'hidden', borderRadius: 12, border: '1px solid rgba(255,255,255,0.04)', boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}
      >
        {/* center ship (original simple emoji rocket) */}
        <div style={{ position: "absolute", left: '50%', top: '50%', width: shipR * 2, height: shipR * 2, borderRadius: "50%", background: "linear-gradient(135deg,#eee,#ccc)", display: "flex", alignItems: "center", justifyContent: "center", color: "#001", transform: 'translate(-50%,-50%)', pointerEvents: 'none', fontSize: shipR * 1.8, lineHeight: 1, userSelect: 'none' }}>
          🚀
        </div>

        {/* no shield visual */}

        {/* asteroids */}
        {asteroids.map((a) =>
          a.alive && a.started ? (
            <svg
              key={a.id}
              onClick={(ev) => {
                // stop propagation so the container click doesn't also fire
                ev.stopPropagation();
                shootAt(a.x, a.y);
              }}
              style={{ position: 'absolute', left: a.x - a.r, top: a.y - a.r, width: a.r * 2, height: a.r * 2, cursor: 'crosshair', pointerEvents: 'auto' }}
              viewBox={`${-a.r} ${-a.r} ${a.r * 2} ${a.r * 2}`}
            >
              <path d={a.shape} fill="#8b6b4b" stroke="#4a2f1a" strokeWidth={1} />
            </svg>
          ) : null
        )}

        {/* missiles */}
        {missiles.map((m, i) => (
          <div key={m.id || i} style={{ position: 'absolute', left: m.x - m.r, top: m.y - m.r, width: m.r * 2, height: m.r * 2, borderRadius: '50%', background: 'linear-gradient(90deg,#fff,#ffd36b)', boxShadow: '0 6px 18px rgba(255,200,80,0.6)', pointerEvents: 'none', transform: 'translateZ(0)', zIndex: 80 }} />
        ))}

        {/* explosions */}
        {explosions.map((ex) => {
          const prog = 1 - Math.max(0, ex.ttl / ex.life);
          const size = ex.r * (1 + prog * 1.6);
          const opacity = 1 - prog;
          return (
            <div key={ex.id} style={{ position: 'absolute', left: ex.x - size / 2, top: ex.y - size / 2, width: size, height: size, borderRadius: '50%', background: `radial-gradient(circle at 30% 30%, rgba(255,255,200,${0.9 * opacity}), rgba(255,140,40,${0.6 * opacity}), rgba(200,60,20,${0.2 * opacity}))`, pointerEvents: 'none', filter: `blur(${4 * prog}px)`, transform: `scale(${1})`, zIndex: 90 }} />
          );
        })}

        {/* HUD / message */}
        <div style={{ position: "absolute", left: 12, top: 12, zIndex: 50, pointerEvents: 'none' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{message}</div>
          {ended && (
            <div style={{ marginTop: 12 }}>
              <button onClick={restart} style={{ padding: "8px 12px", borderRadius: 8, fontWeight: 800, pointerEvents: 'auto' }}>
                Recommencer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// small helpers
function radToDeg(r: number) {
  return (r * 180) / Math.PI;
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  const d = [`M ${start.x} ${start.y}`, `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`].join(" ");
  return d;
}

export default Comet;

