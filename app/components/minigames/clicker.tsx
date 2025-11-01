import { useContext, useState } from "react";
import { MinigamesContext } from "~/context/minigames/MinigamesContext";

import unlocked from "~/../public/images/Cadenas_ouvert-removebg-preview.png"; 
import locked from "~/../public/images/Cadenas_ferme-removebg-preview.png";

//Target count
const randomPosition = 10
const victoryTarget = 20;

// count text related
const offsetY = -30;

// lock related
const objCenter = 24;

const Clicker = () => {
    const { nextLevel } = useContext(MinigamesContext);
    const [count, setCount] = useState(0);

    const handleClick = () => {
        const newCount = count + 1;
        setCount(newCount);

        if (newCount >= victoryTarget) {
            nextLevel();
        }
    };

    const isUnlocked = count >= victoryTarget;

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <button
                onClick={handleClick}
                disabled={isUnlocked}
                className="relative flex items-center justify-center w-48 h-48 rounded-full bg-transparent active:scale-95 transition-transform"
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
    );
};

export default Clicker;

