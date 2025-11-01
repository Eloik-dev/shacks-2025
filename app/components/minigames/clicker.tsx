import { useContext, useState } from "react";
import { MinigamesContext } from "~/context/minigames/MinigamesContext";

const target = 100;

const Clicker = () => {
    const { nextLevel } = useContext(MinigamesContext);

    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
        if (count + 1 >= target) {
            nextLevel();
        }
    }


    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <button
                onClick={handleClick}
                className="flex items-center justify-center w-40 h-40 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-4xl font-bold shadow-lg active:scale-95 transition-transform"
            >
                {count}
            </button>
        </div>
    );
};

export default Clicker;
