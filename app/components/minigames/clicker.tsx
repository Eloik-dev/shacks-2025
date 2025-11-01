import { useContext, useEffect, useState } from "react";
import { MinigamesContext } from "~/context/minigames/MinigamesContext";

import unlocked from "~/../public/images/Cadenas_ouvert-removebg-preview.png";
import locked from "~/../public/images/Cadenas_ferme-removebg-preview.png";

// Targets
const randomPositionTarget = 10;
const victoryTarget = 20;

// Visual offsets
const offsetY = -30;

const Clicker = () => {
    const { updateDescription, resetCapcha, nextLevel } = useContext(MinigamesContext);
    const [count, setCount] = useState(0);
    const [randomX, setRandomX] = useState(0);
    const [randomY, setRandomY] = useState(0);
    const [timer, setTimer] = useState(30); // countdown starts at 30 seconds
    const [showRestart, setShowRestart] = useState(false);

    useEffect(() => {
        updateDescription("Cliquez sur le cadenas pour le déverrouiller !");
    }, [updateDescription]);

    // Countdown timer
    useEffect(() => {
        if (timer <= 0) {
            resetCapcha();
            return;
        }

        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleClick = () => {
        const newCount = count + 1;
        setCount(newCount);

        if (newCount >= randomPositionTarget) {
            setRandomX(Math.round(Math.random() * 800) - 400);
            setRandomY(Math.round(Math.random() * 800) - 400);
        }

        if (newCount >= victoryTarget) {
            nextLevel();
        }
    };

    const isUnlocked = count >= victoryTarget;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
            {/* Timer display */}
            <div className="text-white text-2xl mb-4 text-center">
                Temps restant: {timer}s
            </div>

            {/* Clickable lock */}
            <div className="flex items-center justify-center h-150">
                <button
                    onClick={handleClick}
                    disabled={isUnlocked || showRestart}
                    className="relative flex items-center justify-center w-36 h-36 rounded-full bg-transparent active:scale-95 transition-transform"
                    style={{ marginLeft: randomX, marginTop: randomY }}
                >
                    <img
                        src={isUnlocked ? unlocked : locked}
                        alt={isUnlocked ? "Cadenas ouvert" : "Cadenas fermé"}
                        className="w-full h-full object-contain pointer-events-none"
                    />
                    <span
                        className="absolute text-white text-3xl font-bold"
                        style={{ top: `${offsetY}px` }}
                    >
                        {count}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Clicker;