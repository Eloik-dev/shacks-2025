import { useContext, useMemo, type ReactElement } from "react";
import { MinigamesContext } from "~/context/minigames/MinigamesContext";

const CaptchaWrapper = ({ children }: { children: ReactElement }) => {
    const { levelCount, currentLevel, currentDescription } = useContext(MinigamesContext);

    const progress = useMemo(() => {
        return ((currentLevel) / levelCount);
    }, [currentLevel, levelCount]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="min-w-fit p-[5px] relative padding border rounded-lg shadow-md bg-white overflow-hidden font-sans">
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b">
                    <div className="text-sm font-medium text-gray-700">
                        {currentDescription}
                    </div>

                    <progress value={progress} />
                </div>

                {/* Content area where your children go */}
                <div className="p-2">
                    {children}
                </div>

                {/* Footer (reCAPTCHA branding style) */}
                <div className="flex items-center justify-between px-3 py-2 border-t bg-gray-100">
                    <div className="text-xs text-gray-500">reCAPTGAME</div>
                    <div className="flex space-x-2 text-[10px] text-gray-400">
                        <a href="#" className="hover:text-gray-600 underline">
                            Confidentialité
                        </a>
                        <span>•</span>
                        <a href="#" className="hover:text-gray-600 underline">
                            Termes et conditions
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaptchaWrapper;
