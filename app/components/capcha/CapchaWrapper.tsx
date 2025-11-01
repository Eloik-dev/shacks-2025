import { useContext, type ReactElement } from "react";
import { MinigamesContext } from "~/context/minigames/MinigamesContext";

const CaptchaWrapper = ({ children }: { children: ReactElement }) => {
    const { currentDescription } = useContext(MinigamesContext);

    return (
        <div className="w-[320px] border rounded-lg shadow-md bg-white overflow-hidden font-sans">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b">
                <div className="text-sm font-medium text-gray-700">
                    {currentDescription}
                </div>
                <button className="text-xs text-blue-600 hover:underline">
                    Refresh
                </button>
            </div>

            {/* Content area where your children go */}
            <div className="p-2 grid grid-cols-3 gap-2 bg-gray-50">
                {children}
            </div>

            {/* Footer (reCAPTCHA branding style) */}
            <div className="flex items-center justify-between px-3 py-2 border-t bg-gray-100">
                <div className="text-xs text-gray-500">reCAPTCHA</div>
                <div className="flex space-x-2 text-[10px] text-gray-400">
                    <a href="#" className="hover:text-gray-600 underline">
                        Privacy
                    </a>
                    <span>•</span>
                    <a href="#" className="hover:text-gray-600 underline">
                        Terms
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CaptchaWrapper;
