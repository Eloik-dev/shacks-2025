import React, { useEffect, useRef, useState } from "react";
import "./snake.css";

type Point = { x: number; y: number };

const GRID_SIZE = 10; // number of cells per row/col
const CELL_SIZE = 24; // pixels per cell (bigger so snake is clearly visible)
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
const TICK_INITIAL = 120; // ms per move
const ORB_SCORE = 10; // points per orb
const WIN_SCORE = 200;

const randomPoint = (exclude: Point[] = []): Point => {
    while (true) {
        const p = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
        if (!exclude.some(e => e.x === p.x && e.y === p.y)) return p;
    }
};

const Snake: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [snake, setSnake] = useState<Point[]>([{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }]);
    const [dir, setDir] = useState<Point>({ x: 1, y: 0 });
    const [orb, setOrb] = useState<Point>(() => randomPoint([{ x: 8, y: 10 }]));
    const [score, setScore] = useState(0);
    const [tickMs, setTickMs] = useState(TICK_INITIAL);
    const [running, setRunning] = useState(true);
    const [gameOver, setGameOver] = useState<string | null>(null);

    const dirRef = useRef(dir);
    dirRef.current = dir;

    // handle keyboard
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!running) return;
            const k = e.key;
            const current = dirRef.current;
            let next: Point | null = null;
            if ((k === "ArrowUp" || k.toLowerCase() === "w") && current.y !== 1) next = { x: 0, y: -1 };
            if ((k === "ArrowDown" || k.toLowerCase() === "s") && current.y !== -1) next = { x: 0, y: 1 };
            if ((k === "ArrowLeft" || k.toLowerCase() === "a") && current.x !== 1) next = { x: -1, y: 0 };
            if ((k === "ArrowRight" || k.toLowerCase() === "d") && current.x !== -1) next = { x: 1, y: 0 };
            if (next) setDir(next);
            if (k === " " || k === "Spacebar") setRunning(r => !r);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [running]);

    // main game loop
    useEffect(() => {
        if (gameOver) return;
        const id = setInterval(() => {
            if (!running) return;
            setSnake(prev => {
                const head = prev[0];
                const nextHead = { x: (head.x + dirRef.current.x + GRID_SIZE) % GRID_SIZE, y: (head.y + dirRef.current.y + GRID_SIZE) % GRID_SIZE };

                // self collision
                if (prev.some(p => p.x === nextHead.x && p.y === nextHead.y)) {
                    setGameOver("Hit your tail! Game Over");
                    setRunning(false);
                    return prev;
                }

                let grew = false;
                // collect orb
                if (nextHead.x === orb.x && nextHead.y === orb.y) {
                    setScore(s => {
                        const ns = s + ORB_SCORE;
                        if (ns >= WIN_SCORE) {
                            setGameOver("You win! 🎉");
                            setRunning(false);
                        }
                        return ns;
                    });
                    // grow: keep tail
                    grew = true;
                    // place new orb avoiding snake including new head
                    setOrb(prevOrb => randomPoint([nextHead, ...prev]));
                    // speed up slightly
                    setTickMs(ms => Math.max(40, Math.floor(ms * 0.98)));
                }

                const newSnake = [nextHead, ...prev];
                if (!grew) newSnake.pop();
                return newSnake;
            });
        }, tickMs);
        return () => clearInterval(id);
    }, [running, tickMs, orb, gameOver]);

    // draw
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        // background
        ctx.fillStyle = "#0b1226";
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        // grid (optional subtle)
        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        for (let i = 0; i <= GRID_SIZE; i++) {
            ctx.beginPath();
            ctx.moveTo(i * CELL_SIZE, 0);
            ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * CELL_SIZE);
            ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
            ctx.stroke();
        }

        // draw orb
        ctx.fillStyle = "#ffb86b";
        ctx.beginPath();
        ctx.arc(orb.x * CELL_SIZE + CELL_SIZE / 2, orb.y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE * 0.42, 0, Math.PI * 2);
        ctx.fill();

        // draw snake
        for (let i = 0; i < snake.length; i++) {
            const p = snake[i];
            const grad = ctx.createLinearGradient(p.x * CELL_SIZE, p.y * CELL_SIZE, p.x * CELL_SIZE + CELL_SIZE, p.y * CELL_SIZE + CELL_SIZE);
            grad.addColorStop(0, i === 0 ? "#8be9fd" : "#50fa7b");
            grad.addColorStop(1, i === 0 ? "#6272a4" : "#018b46");
            ctx.fillStyle = grad;
            ctx.fillRect(p.x * CELL_SIZE + 1, p.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
        }
    }, [snake, orb]);

    const reset = () => {
        setSnake([{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }]);
        setDir({ x: 1, y: 0 });
        setOrb(randomPoint([{ x: 8, y: 10 }]));
        setScore(0);
        setTickMs(TICK_INITIAL);
        setRunning(true);
        setGameOver(null);
    };

    return (
        <div className="snake-wrap">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} className="snake-canvas" />
                <div style={{ marginTop: 8, textAlign: "center" }}>
                    <div className="snake-score">Score: {score} / {WIN_SCORE}</div>
                    <div className="snake-small">Orb = {ORB_SCORE}pts · Speed: {Math.round(1000 / tickMs)} moves/sec</div>
                    <div style={{ marginTop: 8 }} className="snake-controls">
                        <button onClick={() => setRunning(r => !r)} style={{ marginRight: 8 }}>{running ? "Pause" : "Resume"}</button>
                        <button onClick={reset}>Restart</button>
                    </div>
                </div>
            </div>

            <div className="snake-info">
                <h2>Snake Minigame</h2>
                <p>Collect the glowing orb. Each orb gives <strong>{ORB_SCORE}</strong> points. Reach <strong>{WIN_SCORE}</strong> points to win.</p>
                <p>Controls: Arrow keys or WASD to move. Space to pause/resume.</p>
                <p>Don't run into your tail — doing so ends the game. The arena wraps around the edges.</p>
                {gameOver && (
                    <div className="game-over">
                        <strong style={{ fontSize: 16 }}>{gameOver}</strong>
                        <div style={{ marginTop: 8 }}>
                            <button onClick={reset}>Play again</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Snake;