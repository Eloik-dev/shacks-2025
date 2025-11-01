import { useEffect, useState } from "react";

import unlocked from "~/src/images/Cadenas_ouvert-removebg-preview.png";
import locked from "~/src/images/Cadenas_ferme-removebg-preview.png";
import { useMinigamesContext } from "~/context/MinigamesContext";
import { useGlobalContext } from "~/context/GlobalContext";

// Targets
const randomPositionTarget = 10;
const randomMovingTarget = 20;
const victoryTarget = 30;

// Visual offsets
const offsetY = -30;

// Clicker Minigame Component
const moveSpeed = 300;

const Clicker = () => {
    const { updateHumanPercentage } = useGlobalContext();
    const { updateDescription, nextLevel } = useMinigamesContext();
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
            reset();
            return;
        }

        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    // Moving target logic
    useEffect(() => {
        if (count < randomMovingTarget) return;

        const moveInterval = setInterval(() => {
            // Random direction movement
            setRandomX(prevX => prevX + (Math.random() * 2 - 1) * moveSpeed);
            setRandomY(prevY => prevY + (Math.random() * 2 - 1) * moveSpeed);

            // Optional: keep within screen bounds
            setRandomX(prevX => Math.max(Math.min(prevX, 400), -400));
            setRandomY(prevY => Math.max(Math.min(prevY, 400), -400));
        }, 100); // update every 100ms

        return () => clearInterval(moveInterval);
    }, [count]);

    const handleClick = () => {
        const newCount = count + 1;
        setCount(newCount);

        if (newCount >= randomPositionTarget && newCount < randomMovingTarget) {
            setRandomX(Math.round(Math.random() * 800) - 400);
            setRandomY(Math.round(Math.random() * 800) - 400);
        }

        if (newCount >= victoryTarget) {
            nextLevel();
        }
    };

    const reset = () => {
        setCount(0);
        setRandomX(0);
        setRandomY(0);
        setTimer(30);
        setShowRestart(true);
    }

    const isUnlocked = count >= victoryTarget;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
            {/* Timer display */}
            <div className="text-white text-2xl mb-4 text-center">
                Temps restant: {timer}s
            </div>

            {/* Clickable lock */}
            <div className="flex items-center justify-center h-150 select-none">
                <button
                    onClick={handleClick}
                    disabled={isUnlocked || showRestart}
                    className="relative cursor-pointer flex items-center justify-center w-36 h-36 rounded-full bg-transparent active:scale-95 transition-transform select-none"
                    style={{ marginLeft: randomX, marginTop: randomY, transition: "margin 0.3s" }}
                >
                    <img
                        src={isUnlocked ? unlocked : locked}
                        alt={isUnlocked ? "Cadenas ouvert" : "Cadenas fermé"}
                        className="w-full h-full object-contain pointer-events-none select-none"
                    />
                    <span
                        className="absolute text-white text-3xl font-bold pointer-events-none select-none"
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