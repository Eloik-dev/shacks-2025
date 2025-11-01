import React, { useContext, useEffect } from "react";
import { MinigamesContext } from "~/context/minigames/MinigamesContext";

type Cell = "X" | "O" | null;

const WIN_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const initialBoard: Cell[] = Array(9).fill(null);

const Tictacto: React.FC = () => {
    const { updateDescription, nextLevel } = useContext(MinigamesContext);

    const [board, setBoard] = React.useState<Cell[]>(initialBoard);
    const [message, setMessage] = React.useState<string>(
        "À vous de jouer (X)"
    );
    const [isUserTurn, setIsUserTurn] = React.useState<boolean>(true);
    const [gameOver, setGameOver] = React.useState<boolean>(false);
    const [winningLine, setWinningLine] = React.useState<number[] | null>(null);
    const [destroyed, setDestroyed] = React.useState<boolean>(false);
    const [rebuilding, setRebuilding] = React.useState<boolean>(false);
    const [hidden, setHidden] = React.useState<boolean>(false);
    const [disintegrateLine, setDisintegrateLine] = React.useState<boolean>(false);
    const [lossCount, setLossCount] = React.useState<number>(0);
    const [blocked, setBlocked] = React.useState<boolean>(false);
    const countedLossRef = React.useRef<boolean>(false);
    const [keySnapping, setKeySnapping] = React.useState<boolean>(false);
    const lockRef = React.useRef<HTMLDivElement | null>(null);
    const keyRef = React.useRef<HTMLDivElement | null>(null);
    const draggingRef = React.useRef<boolean>(false);
    const dragOffset = React.useRef<{ dx: number, dy: number }>({ dx: 0, dy: 0 });
    const [keyPos, setKeyPos] = React.useState<{ x: number, y: number }>({ x: 40, y: 400 });
    const [cellVars, setCellVars] = React.useState<Array<{ tx: number, ty: number, rot: number, delay: number }>>(() =>
        new Array(9).fill(0).map(() => ({ tx: 0, ty: 0, rot: 0, delay: 0 }))
    );

    useEffect(() => {
        updateDescription('Gagnez au Tictacto pour prouver que vous êtes humain.');
    }, [updateDescription]);

    function checkWinner(b: Cell[]) {
        for (const [a, c, d] of WIN_LINES) {
            if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
        }
        if (b.every((x) => x !== null)) return "draw";
        return null;
    }

    function findWinningLine(b: Cell[]) {
        for (const line of WIN_LINES) {
            const [a, c, d] = line;
            if (b[a] && b[a] === b[c] && b[a] === b[d]) return line;
        }
        return null;
    }

    function makeComputerMove(currentBoard: Cell[]) {
        // If the UI is blocked by the lock, don't make moves
        if (gameOver || blocked) return;
        // Helper: list of free indexes
        const free = currentBoard
            .map((v, i) => (v === null ? i : -1))
            .filter((i) => i !== -1);
        if (free.length === 0) return;

        // 1) Win if possible
        for (const idx of free) {
            const probe = [...currentBoard];
            probe[idx] = "O";
            if (checkWinner(probe) === "O") {
                playComputerMove(idx);
                return;
            }
        }

        // 2) Block opponent if they would win next
        for (const idx of free) {
            const probe = [...currentBoard];
            probe[idx] = "X";
            if (checkWinner(probe) === "X") {
                playComputerMove(idx);
                return;
            }
        }

        // 3) Take center
        if (currentBoard[4] === null) {
            playComputerMove(4);
            return;
        }

        // 4) Take any corner
        const corners = [0, 2, 6, 8].filter((i) => currentBoard[i] === null);
        if (corners.length > 0) {
            playComputerMove(corners[Math.floor(Math.random() * corners.length)]);
            return;
        }

        // 5) Take any side
        const sides = [1, 3, 5, 7].filter((i) => currentBoard[i] === null);
        if (sides.length > 0) {
            playComputerMove(sides[Math.floor(Math.random() * sides.length)]);
            return;
        }

        // fallback
        playComputerMove(free[Math.floor(Math.random() * free.length)]);
    }

    function playComputerMove(choice: number) {
        // Very small delay so the UI can update (keeps feel responsive but not janky)
        const delay = 80; // ms — reduced for snappier response
        setTimeout(() => {
            const next = (prevBoard: Cell[]) => {
                const copy = [...prevBoard];
                if (copy[choice] !== null) return copy; // already taken
                copy[choice] = "O";
                return copy;
            };

            setBoard((prev) => {
                const nb = next(prev);
                const result = checkWinner(nb);
                if (result === "O") {
                    setWinningLine(findWinningLine(nb));
                    // increment loss counter (reset on user win elsewhere)
                    // ensure we only count a single loss per round
                    if (!countedLossRef.current) {
                        countedLossRef.current = true;
                        setLossCount((c) => {
                            const nc = c + 1;
                            if (nc >= 3) {
                                // block the game after this loss
                                setBlocked(true);
                            }
                            return nc;
                        });
                        // move key to a random place so it appears in different spots after each loss
                        if (typeof window !== 'undefined') {
                            const margin = 80;
                            const maxX = Math.max(80, window.innerWidth - margin - 72);
                            const maxY = Math.max(120, window.innerHeight - margin - 44);
                            const rx = Math.floor(margin + Math.random() * (maxX - margin));
                            const ry = Math.floor(margin + Math.random() * (maxY - margin));
                            setKeyPos({ x: rx, y: ry });
                        }
                    }
                    // show big loser message first
                    setMessage("PERDANT");
                    setGameOver(true);
                    // after a short delay show disintegration of winning line and explosion
                    setTimeout(() => {
                        setDisintegrateLine(true);
                        setCellVars(generateTransforms());
                        setDestroyed(true);
                        // wait for explosion/disintegration animation to finish then hide board (but keep PERDANT)
                        setTimeout(() => {
                            setDestroyed(false);
                            setDisintegrateLine(false);
                            setHidden(true);
                            // remove the winning line after disintegration
                            setWinningLine(null);
                        }, 900);
                    }, 700);
                } else if (result === "draw") {
                    setWinningLine(null);
                    setMessage("Match nul.");
                    setGameOver(true);
                } else {
                    setMessage("À vous de jouer (X)");
                    setIsUserTurn(true);
                }
                return nb;
            });
        }, delay);
    }

    function generateTransforms() {
        return new Array(9).fill(0).map(() => {
            const tx = Math.round((Math.random() - 0.5) * 800);
            const ty = Math.round((Math.random() - 0.5) * 600);
            const rot = Math.round((Math.random() - 0.5) * 720);
            const delay = Math.round(Math.random() * 200);
            return { tx, ty, rot, delay };
        });
    }



    function handleUserClick(idx: number) {
        // If the game is locked due to repeated defeats, ignore clicks
        if (blocked || !isUserTurn || gameOver) return;
        if (board[idx] !== null) return;
        const next = [...board];
        next[idx] = "X";
        setBoard(next);
        setIsUserTurn(false);

        const result = checkWinner(next);
        if (result === "X") {
            setWinningLine(findWinningLine(next));
            setMessage("Vous avez gagné !");
            setGameOver(true);
            nextLevel();
            return;
        }
        if (result === "draw") {
            setWinningLine(null);
            setMessage("Match nul.");
            setGameOver(true);
            return;
        }

        // Let the computer play (call immediately so it's responsive)
        setMessage("L'ordinateur réfléchit...");
        makeComputerMove(next);
    }

    function reset() {
        // If UI was fully hidden after destruction, rebuild
        if (hidden) {
            // clear the counted-loss flag so future losses are counted again
            countedLossRef.current = false;
            setKeySnapping(false);
            setHidden(false);
            // prepare assemble transforms (cells will fly in to build)
            const vars = generateTransforms();
            setCellVars(vars);
            // start with empty cells (they will assemble)
            setBoard(initialBoard.slice().map(() => null));
            setRebuilding(true);
            setTimeout(() => {
                setRebuilding(false);
                setGameOver(false);
                setIsUserTurn(true);
                setMessage("À vous de jouer (X)");
                setBoard(initialBoard.slice());
            }, 900);
            return;
        }

        // normal reset (user starts)
        setBoard(initialBoard.slice());
        setGameOver(false);
        setIsUserTurn(true);
        setMessage("À vous de jouer (X)");
        setWinningLine(null);
        // clear countedLoss flag and, if user manually resets while blocked, un-block
        countedLossRef.current = false;
        if (blocked) {
            setBlocked(false);
            setLossCount(0);
            setHidden(false);
            setKeySnapping(false);
        }
    }

    // On mount, user starts
    React.useEffect(() => {
        setIsUserTurn(true);
        setMessage("À vous de jouer (X)");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // initialize key position near bottom-left after client mounts
    React.useEffect(() => {
        // position key slightly above bottom-left
        setKeyPos({ x: 40, y: window.innerHeight - 140 });
        // cleanup listeners on unmount
        return () => {
            window.removeEventListener('mousemove', onWindowMouseMove as any);
            window.removeEventListener('mouseup', onWindowMouseUp as any);
            window.removeEventListener('touchmove', onWindowTouchMove as any);
            window.removeEventListener('touchend', onWindowMouseUp as any);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onWindowMouseMove(e: MouseEvent) {
        if (!draggingRef.current) return;
        const dx = dragOffset.current.dx;
        const dy = dragOffset.current.dy;
        setKeyPos({ x: e.clientX - dx, y: e.clientY - dy });
    }

    function onWindowTouchMove(e: TouchEvent) {
        if (!draggingRef.current) return;
        const t = e.touches[0];
        const dx = dragOffset.current.dx;
        const dy = dragOffset.current.dy;
        setKeyPos({ x: t.clientX - dx, y: t.clientY - dy });
    }

    function onWindowMouseUp(e: MouseEvent | TouchEvent) {
        if (!draggingRef.current) return;
        draggingRef.current = false;
        window.removeEventListener('mousemove', onWindowMouseMove as any);
        window.removeEventListener('mouseup', onWindowMouseUp as any);
        window.removeEventListener('touchmove', onWindowTouchMove as any);
        window.removeEventListener('touchend', onWindowMouseUp as any);
        // check drop into lock
        if (lockRef.current && keyRef.current) {
            const lockRect = lockRef.current.getBoundingClientRect();
            const keyRect = keyRef.current.getBoundingClientRect();
            const keyCenterX = keyRect.left + keyRect.width / 2;
            const keyCenterY = keyRect.top + keyRect.height / 2;
            if (
                keyCenterX >= lockRect.left &&
                keyCenterX <= lockRect.right &&
                keyCenterY >= lockRect.top &&
                keyCenterY <= lockRect.bottom
            ) {
                // play snap animation: move key to center of lock then unlock
                const lockCenterX = lockRect.left + lockRect.width / 2 - keyRect.width / 2;
                const lockCenterY = lockRect.top + lockRect.height / 2 - keyRect.height / 2;
                // trigger transition
                setKeySnapping(true);
                setKeyPos({ x: lockCenterX, y: lockCenterY });
                // wait for snap animation then unlock
                setTimeout(() => {
                    setBlocked(false);
                    setLossCount(0);
                    countedLossRef.current = false;
                    setHidden(false);
                    setMessage("À vous de jouer (X)");
                    setIsUserTurn(true);
                    // clear snapping state after transition
                    setTimeout(() => setKeySnapping(false), 200);
                }, 380);
            }
        }
    }

    function startDragFromEvent(e: React.MouseEvent | React.TouchEvent) {
        // prevent starting if not blocked (key should only be visible when blocked)
        if (!blocked) return;
        let clientX = 0;
        let clientY = 0;
        if ('touches' in e && e.touches && e.touches[0]) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else if ('clientX' in e) {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }
        draggingRef.current = true;
        dragOffset.current = { dx: clientX - keyPos.x, dy: clientY - keyPos.y };
        window.addEventListener('mousemove', onWindowMouseMove as any);
        window.addEventListener('mouseup', onWindowMouseUp as any);
        window.addEventListener('touchmove', onWindowTouchMove as any, { passive: false } as any);
        window.addEventListener('touchend', onWindowMouseUp as any);
    }

    // Minimal inline styles scoped to this component to avoid global CSS changes
    const CELL_SIZE = 100;
    const GAP = 8;
    const TOTAL = 3 * CELL_SIZE + 2 * GAP;

    const styles: { [k: string]: React.CSSProperties } = {
        // Full-page dark container scoped to this component so only the TicTacToe page looks black
        container: {
            minHeight: "50vh",
            background: "#000",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            boxSizing: "border-box",
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: GAP,
            marginTop: 12,
            width: TOTAL,
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative",
        },
        cell: {
            width: CELL_SIZE,
            height: CELL_SIZE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 800,
            background: "linear-gradient(135deg,#0f172a, #001f3f)",
            border: "2px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            cursor: "pointer",
            userSelect: "none",
            color: "#fff",
        },
        footer: { marginTop: 16 },
        small: { fontSize: 14, color: "#ddd" },
    };

    const STRIKE_THICK = 6;

    function getStrikeStyle(line: number[]) {
        if (!line) return { display: "none" } as React.CSSProperties;
        // compute center positions of the first and last cell in the line
        const p = (i: number) => ({
            x: (i % 3) * (CELL_SIZE + GAP) + CELL_SIZE / 2,
            y: Math.floor(i / 3) * (CELL_SIZE + GAP) + CELL_SIZE / 2,
        });
        const p1 = p(line[0]);
        const p3 = p(line[2]);
        const dx = p3.x - p1.x;
        const dy = p3.y - p1.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const midX = p1.x + dx / 2;
        const midY = p1.y + dy / 2;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        return {
            position: 'absolute',
            left: `${midX - length / 2}px`,
            top: `${midY - STRIKE_THICK / 2}px`,
            width: `${length}px`,
            height: STRIKE_THICK,
            background: '#ffe66d',
            transform: `rotate(${angle}deg)`,
            transformOrigin: 'center',
            borderRadius: STRIKE_THICK / 2,
            zIndex: 2,
        } as React.CSSProperties;
    }

    return (
        <div style={styles.container} aria-live="polite">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <h2 style={{ marginBottom: 6, fontSize: 36, letterSpacing: 2 }}>Tictacto</h2>
                {/* small defeats counter next to title */}
                <div style={{ color: '#ff6b6b', fontWeight: 700, marginLeft: 8 }}>
                    {lossCount > 0 ? `Défaites: ${lossCount}/3` : null}
                </div>
            </div>
            {/* show big red PERDANT as a button under the title, with Recommencer below it */}
            {message === "PERDANT" ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <button
                        disabled
                        style={{
                            background: 'linear-gradient(90deg,#ff2d2d,#ff6b6b)',
                            color: '#fff',
                            fontSize: 44,
                            fontWeight: 900,
                            padding: '12px 24px',
                            borderRadius: 10,
                            border: 'none',
                            letterSpacing: 2,
                        }}
                    >
                        PERDANT
                    </button>

                    {/* Only show Recommencer here once the board is fully hidden (user requested) */}
                    {hidden ? (
                        <button
                            onClick={reset}
                            style={{
                                background: 'linear-gradient(90deg,#ff2fb1,#00fff0)',
                                color: '#001014',
                                fontSize: 18,
                                fontWeight: 800,
                                padding: '10px 18px',
                                borderRadius: 8,
                                border: 'none',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
                            }}
                        >
                            Recommencer
                        </button>
                    ) : null}
                </div>
            ) : (
                <p style={styles.small}>{message}</p>
            )}

            {/* scoped animation styles for explode/assemble */}
            <style>{`
                        .tictacto-grid { position: relative; }
                        .tictacto-cell { will-change: transform, opacity; }
                        .tictacto-cell.explode { animation: explode 700ms forwards; animation-delay: var(--delay); }
                        .tictacto-cell.assemble { animation: assemble 700ms forwards; animation-delay: var(--delay); }
                        .tictacto-strike.disintegrate { animation: disintegrate 900ms forwards; }
                        @keyframes explode {
                            to { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; }
                        }
                        @keyframes assemble {
                            from { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; }
                            to { transform: none; opacity: 1; }
                        }
                        @keyframes disintegrate {
                            0% { opacity: 1; filter: none; transform: scaleX(1); }
                            40% { opacity: 0.8; filter: blur(2px) hue-rotate(10deg); transform: scaleX(0.9) translateY(-4px); }
                            100% { opacity: 0; transform: scaleX(0.2) translateY(-30px) rotate(-8deg); filter: blur(6px); }
                        }
                    `}</style>

            {!hidden && (
                <div className="tictacto-grid" style={styles.grid}>
                    {/* strike overlay */}
                    {winningLine && (
                        <div
                            className={`tictacto-strike ${disintegrateLine ? 'disintegrate' : ''}`}
                            style={getStrikeStyle(winningLine)}
                        />
                    )}

                    {board.map((v, i) => {
                        // flashy colors
                        const isWinning = !!winningLine && winningLine.includes(i);
                        let cellBg: string | undefined;
                        let textColor = "#fff";
                        let textShadow = "none";
                        if (v === null) {
                            cellBg = "linear-gradient(135deg,#071024,#00101f)";
                            textColor = "#fff";
                        } else if (v === "X") {
                            cellBg = "linear-gradient(135deg,#00fff0,#00c2ff)"; // neon cyan
                            textColor = "#001014";
                            textShadow = "0 0 12px rgba(0,255,240,0.6)";
                        } else {
                            cellBg = "linear-gradient(135deg,#ff2fb1,#ff7ae0)"; // neon magenta
                            textColor = "#fff";
                            textShadow = "0 0 12px rgba(255,47,177,0.6)";
                        }

                        const vars = cellVars[i] || { tx: 0, ty: 0, rot: 0, delay: 0 };
                        const cssVars: React.CSSProperties = {
                            ['--tx' as any]: `${vars.tx}px`,
                            ['--ty' as any]: `${vars.ty}px`,
                            ['--rot' as any]: `${vars.rot}deg`,
                            ['--delay' as any]: `${vars.delay}ms`,
                        };

                        const className = `tictacto-cell ${destroyed ? 'explode' : rebuilding ? 'assemble' : ''}`;

                        return (
                            <div
                                key={i}
                                role="button"
                                aria-label={`case ${i + 1}`}
                                onClick={() => handleUserClick(i)}
                                className={className}
                                style={{
                                    ...styles.cell,
                                    ...cssVars,
                                    background: cellBg,
                                    color: textColor,
                                    textShadow,
                                    cursor: gameOver || !isUserTurn || v !== null ? "not-allowed" : "pointer",
                                    opacity: 1,
                                    boxShadow: isWinning
                                        ? "0 0 18px rgba(255,230,109,0.45), inset 0 0 0 3px rgba(255,230,109,0.12)"
                                        : "0 6px 18px rgba(0,0,0,0.35)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {v}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* persistent restart overlay only when UI hidden and not showing PERDANT below title */}
            {hidden && message !== 'PERDANT' && (
                <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1200 }}>
                    <button onClick={reset} style={{ padding: '16px 24px', fontSize: 20, borderRadius: 10, background: 'linear-gradient(90deg,#ff2fb1,#00fff0)', border: 'none', color: '#001014', fontWeight: 800, boxShadow: '0 8px 30px rgba(0,0,0,0.6)' }}>
                        Recommencer
                    </button>
                </div>
            )}

            {/* full-screen lock overlay + draggable key (key sits above overlay) */}
            {blocked && (
                <>
                    <div
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.85)',
                            zIndex: 2000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: 18,
                            color: '#fff',
                            padding: 24,
                            textAlign: 'center'
                        }}
                    >
                        <div
                            ref={lockRef}
                            style={{
                                width: 240,
                                height: 240,
                                borderRadius: 16,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.7), inset 0 2px 6px rgba(255,255,255,0.02)'
                            }}
                        >
                            <div style={{ fontSize: 96, lineHeight: 1 }}>🔒</div>
                            <div style={{ marginTop: 8, fontSize: 18, fontWeight: 700 }}>Verrouillé</div>
                            <div style={{ marginTop: 6, fontSize: 14, color: '#ffb3b3' }}>Glissez la clé sur le cadenas pour déverrouiller</div>
                            <div style={{ marginTop: 10, fontSize: 13, color: '#ff6b6b', fontWeight: 800 }}>Défaites: {lossCount}/3</div>
                        </div>
                    </div>

                    <div
                        ref={keyRef}
                        onMouseDown={(e) => startDragFromEvent(e)}
                        onTouchStart={(e) => startDragFromEvent(e)}
                        style={{
                            position: 'fixed',
                            left: keyPos.x,
                            top: keyPos.y,
                            zIndex: 2100,
                            width: 72,
                            height: 44,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'grab',
                            background: 'linear-gradient(90deg,#ffd36b,#ff8fb1)',
                            borderRadius: 10,
                            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
                            userSelect: 'none',
                            touchAction: 'none',
                            transition: keySnapping ? 'left 360ms cubic-bezier(.2,.9,.2,1), top 360ms cubic-bezier(.2,.9,.2,1), transform 260ms ease' : 'none',
                            transform: keySnapping ? 'scale(1.08)' : 'none',
                        }}
                    >
                        🔑
                    </div>
                </>
            )}

            {!hidden && (
                <div style={styles.footer}>
                    {/* When user wins, show success badge. Otherwise show Recommencer button (also present on draw/pc win). */}
                    {gameOver && winningLine && board[winningLine[0]] === "X" ? (
                        <div>
                            <div style={{ color: "#0a7f3d", fontWeight: 700, marginBottom: 8 }}>
                                🎉 Succès — vous avez battu l'ordinateur !
                            </div>
                            <button onClick={reset} style={{ padding: "8px 12px", borderRadius: 6 }}>
                                Rejouer
                            </button>
                        </div>
                    ) : gameOver && message !== 'PERDANT' ? (
                        <div>
                            <button onClick={reset} style={{ padding: "8px 12px", borderRadius: 6 }}>
                                Recommencer
                            </button>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default Tictacto;