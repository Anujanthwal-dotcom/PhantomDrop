import { useDispatch } from "react-redux"
import { removeCode } from "../../redux/codeSlice";
import { setSendDeactive } from "../../redux/sendSlice";
import { useState } from "react";
import { removeFile } from "../../redux/fileSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function CodeWindow() {
    const code: string | null = useLocation().state?.code;
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(true); // For triggering fade-out
    const navigate = useNavigate();
    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            dispatch(setSendDeactive(false));
            dispatch(removeCode(null));
            dispatch(removeFile(null));
            navigate("/");
        }, 300); // Match fade-out duration
    };
    console.log("CodeWindow rendered with code:", code);
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"} bg-black/40 backdrop-blur-sm`}>
            <div className={` bg-neutral-900/80 border border-white/10 p-6 rounded-2xl shadow-lg text-white flex flex-col transform transition-all duration-300 ${isVisible ? "scale-100" : "scale-95 opacity-0"}`}>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl font-semibold tracking-wide text-white/90">
                        Enter this code to receive file<br/>
                        <div className="text-base font-mono text-white/80 flex justify-center">This code will expire in 10 minutes</div>
                    </span>
                    <span className="text-base font-mono text-white/80 break-all">
                        {/* code */}
                        {
                            (code !== null) ?
                                (<div>
                                    <span className="text-6xl font-mono text-white/80 break-all">
                                        {code}
                                    </span>
                                </div>)
                                :
                                (<div>
                                    <span className="text-base font-mono text-white/80 break-all">
                                        error in getting code!
                                    </span>
                                </div>)
                        }
                    </span>

                    <div className="flex w-full justify-center">
                        <button onClick={handleClose} className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 cursor-pointer transition-all shadow-md text-lg font-semibold">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeWindow