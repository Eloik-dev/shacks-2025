import { createContext, useState, useCallback, useContext } from "react";

interface IGlobalContext {
    humanPercentage: number;
    updateHumanPercentage: (percentage: number, ponderation: number) => void;
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [humanPercentage, setHumanPercentage] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);

    const updateHumanPercentage = useCallback(
        (percentage: number, ponderation: number) => {
            setHumanPercentage(prev => {
                const weightedSum = prev * totalWeight + percentage * ponderation;
                const newTotalWeight = totalWeight + ponderation;
                const newPercentage = weightedSum / newTotalWeight;

                setTotalWeight(newTotalWeight);
                return newPercentage;
            });
        },
        [totalWeight]
    );

    return (
        <GlobalContext.Provider value={{ humanPercentage, updateHumanPercentage }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const ctx = useContext(GlobalContext);
    if (!ctx) throw new Error("useGlobalContext must be used within GlobalProvider");
    return ctx;
};