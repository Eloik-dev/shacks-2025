import { createContext, useState, useCallback, useContext, useEffect } from "react";
import Cookies from "js-cookie";

interface IGlobalContext {
    humanPercentage: number;
    updateHumanPercentage: (percentage: number, ponderation: number) => void;
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [humanPercentage, setHumanPercentage] = useState<number>(() => {
        // Initialize from cookie if available
        const saved = Cookies.get("humanPercentage");
        return saved ? parseFloat(saved) : 0;
    });

    const [totalWeight, setTotalWeight] = useState<number>(0);

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

    // Persist to cookie whenever it changes
    useEffect(() => {
        Cookies.set("humanPercentage", String(humanPercentage), { expires: 30 }); // 30 days
    }, [humanPercentage]);

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
