import { createContext, useEffect, useState, type ReactElement } from "react";

interface IMinigamesContext {
    nextLevel: () => void;
    capchaSolved: boolean;
    setCapchaSolved: (solved: boolean) => void;
    resetCapcha: () => void;
    levelCount: number;
    victory: boolean;
};

const MinigamesContext = createContext<IMinigamesContext>({
    nextLevel: () => { },
    capchaSolved: false,
    setCapchaSolved: () => { },
    resetCapcha: () => { },
    levelCount: 0,
    victory: false,
});

const MinigamesProvider = ({ levels }: { levels: ReactElement[] }) => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [capchaSolved, setCapchaSolved] = useState(false);
    const [levelCount, setLevelCount] = useState(levels.length);
    const [victory, setVictory] = useState(false);

    useEffect(() => {
        setLevelCount(levels.length);
    }, [levels]);

    const nextLevel = () => {
        setVictory(true);
        setTimeout(() => {
            if (currentLevel < levels.length) {
                setCurrentLevel(currentLevel + 1);
                setCapchaSolved(false);
            } else {
                setCapchaSolved(true);
            }

            setVictory(false);
        }, 1000);
    };

    const resetCapcha = () => {
        setCapchaSolved(false);
        setVictory(false);
    };

    return (
        <MinigamesContext.Provider value={{
            nextLevel,
            capchaSolved,
            setCapchaSolved,
            resetCapcha,
            levelCount,
            victory,
        }}>
            {levels[currentLevel]}
        </MinigamesContext.Provider>
    );
}

export { MinigamesProvider, MinigamesContext };