import { createContext, useEffect, useState, type ReactElement } from "react";
import CaptchaWrapper from "~/components/capcha/CapchaWrapper";

interface IMinigamesContext {
    currentDescription: string;
    updateDescription: (description: string) => void;
    currentLevel: number;
    nextLevel: () => void;
    capchaSolved: boolean;
    setCapchaSolved: (solved: boolean) => void;
    resetCapcha: () => void;
    levelCount: number;
    victory: boolean;
};

const MinigamesContext = createContext<IMinigamesContext>({
    currentDescription: '',
    updateDescription: () => { },
    currentLevel: 0,
    nextLevel: () => { },
    capchaSolved: false,
    setCapchaSolved: () => { },
    resetCapcha: () => { },
    levelCount: 0,
    victory: false,
});

const MinigamesProvider = ({ levels }: { levels: ReactElement[] }) => {
    const [currentDescription, setCurrentDescription] = useState('');
    const [currentLevel, setCurrentLevel] = useState(0);
    const [capchaSolved, setCapchaSolved] = useState(false);
    const [levelCount, setLevelCount] = useState(levels.length);
    const [victory, setVictory] = useState(false);

    useEffect(() => {
        setLevelCount(levels.length);
    }, [levels]);

    const updateDescription = (description: string) => {
        setCurrentDescription(description);
    }

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
            currentDescription,
            updateDescription,
            currentLevel,
            nextLevel,
            capchaSolved,
            setCapchaSolved,
            resetCapcha,
            levelCount,
            victory,
        }}>
            <CaptchaWrapper>
                {levels[currentLevel]}
            </CaptchaWrapper>
        </MinigamesContext.Provider>
    );
}

export { MinigamesProvider, MinigamesContext };