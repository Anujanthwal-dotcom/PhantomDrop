import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSendDeactive } from "../../redux/sendSlice";
import { setCode } from "../../redux/codeSlice";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import BASE from "../../baseurl/BaseURL";
import FormData from 'form-data';

function SelectFileWindow() {

    const [file, setFile] = useState<File | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(true); // For triggering fade-out
    const [sending, setSending] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClose = (): void => {
        setIsVisible(false);
        setTimeout(() => {
            dispatch(setSendDeactive(false));

        }, 300); 
    };

    const handleSend = async () => {
        setSending(true)
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const response = await axios.post(`${BASE}/upload`, formData)
            
            if (response !== null) {
                const code = response.data.code;
                console.log(typeof code);
                setSending(false);
                setFile(null); // Clear the file after sending
                

                dispatch(setCode(code));

                navigate("/code",{state:{code}});
            }
        }
        catch (e) {
            setSending(false);
            console.log(String(e))
        }
    }

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"} bg-black/40 backdrop-blur-sm`}>
            <div className={`w-[90%] max-w-md bg-neutral-900/80 border border-white/10 p-6 rounded-2xl shadow-lg text-white flex flex-col transform transition-all duration-300 ${isVisible ? "scale-100" : "scale-95 opacity-0"}`}>
                <div>
                    <h2 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text tracking-tight leading-tight">
                        Select a File to Send
                    </h2>

                    <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setFile(e.target.files[0]);
                            }
                        }}
                    />

                    <label
                        htmlFor="fileInput"
                        className={`
                            w-full h-60 rounded-xl flex items-center justify-center mb-8 cursor-pointer transition-all px-4 text-center
                            ${file
                                ? 'bg-neutral-700 border-2 border-white/60 text-white'
                                : 'border-2 border-dashed border-white/30 text-white hover:border-white/50 hover:bg-neutral-800/30'
                            }
                        `}
                    >
                        {file ? (
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-2xl font-semibold tracking-wide text-white/90">
                                    ✅ File Selected
                                </span>
                                <span className="text-base font-mono text-white/80 break-all">
                                    {file.name}
                                </span>
                            </div>
                        ) : (
                            <span className="text-xl font-bold tracking-wide">
                                📂 Click here to choose a file
                            </span>
                        )}
                    </label>
                </div>

                <div className="flex justify-between">
                    <button onClick={handleClose} className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 cursor-pointer transition-all shadow-md text-lg font-semibold">
                        Cancel
                    </button>
                    {
                        (sending === false) ?
                            (<button onClick={handleSend} className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 cursor-pointer transition-all shadow-md text-lg font-semibold">
                                Send
                            </button>)
                            :
                            (
                                < div className="flex justify-center items-center">
                                    <div className="w-10 h-10 border-4 border-dashed border-blue-500 rounded-full animate-spin"></div>
                                </div>
                            )
                    }

                </div>
            </div>
        </div >
    );
}

export default SelectFileWindow