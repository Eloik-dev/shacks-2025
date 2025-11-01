import { createContext, useEffect, useState, type ReactElement } from "react";

interface IMinigamesContext {
    nextLevel: () => void;
    capchaSolved: boolean;
    setCapchaSolved: (solved: boolean) => void;
    resetCapcha: () => void;
    levelCount: number;
};

const MinigamesContext = createContext<IMinigamesContext>({
    nextLevel: () => { },
    capchaSolved: false,
    setCapchaSolved: () => { },
    resetCapcha: () => { },
    levelCount: 0
});

const MinigamesProvider = ({ levels }: { levels: ReactElement[] }) => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [capchaSolved, setCapchaSolved] = useState(false);
    const [levelCount, setLevelCount] = useState(levels.length);

    useEffect(() => {
        setLevelCount(levels.length);
    }, [levels]);

    const nextLevel = () => {
        setTimeout(() => {
            if (currentLevel < levels.length) {
                setCurrentLevel(currentLevel + 1);
                setCapchaSolved(false);
            } else {
                setCapchaSolved(true);
            }
        }, 1000);
    };

    const resetCapcha = () => {
        setCapchaSolved(false);
    };

    return (
        <MinigamesContext.Provider value={{
            nextLevel,
            capchaSolved,
            setCapchaSolved,
            resetCapcha,
            levelCount
        }}>
            {levels[currentLevel]}
        </MinigamesContext.Provider>
    );
}

export { MinigamesProvider, MinigamesContext };