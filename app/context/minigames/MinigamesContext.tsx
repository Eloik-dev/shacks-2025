import { createContext, useEffect, useState, type ReactElement } from "react";
import { redirect, useNavigate } from "react-router";
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
    const navigate = useNavigate();
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
        console.log('Current Level:', currentLevel, 'of', levels.length);
        if (currentLevel + 1 >= levels.length) {
            setCapchaSolved(true);
            navigate('/learn');
            return;
        }

        setTimeout(() => {
            setCurrentLevel(currentLevel + 1);
            setCapchaSolved(false);

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