import Logo from '../assets/Gemini_Generated_Image_z5lhiaz5lhiaz5lh-removebg-preview.png';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSendActive } from "../redux/sendSlice";
import { setReceiveActive } from "../redux/receiveSlice";
import type { RootState } from '../redux/store'
import ReceivePage from '../popup/ReceivePage';
import SendPage from '../popup/SendPage';
import { useEffect, useState } from 'react';
function MainSection() {
    const sendActive = useSelector((state: RootState) => state.send.send)
    const receiveActive = useSelector((state: RootState) => state.receive.receive)
    const dispatch = useDispatch()
    const words = ["security", "privacy", "speed", "efficiency"];
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                setFade(true);
            }, 500); // match the transition duration
        }, 3000); // total duration per word

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen bg-neutral-950 text-neutral-100 px-4 flex flex-col items-center justify-center relative overflow-hidden font-sans">
            {/* Soft Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-zinc-900 opacity-95 -z-10" />

            {/* Animated Background Blobs */}
            <div className="absolute w-96 h-96 bg-purple-600 opacity-20 rounded-full top-[10%] left-[15%] blur-3xl animate-pulse-slow -z-10" />
            <div className="absolute w-96 h-96 bg-pink-600 opacity-20 rounded-full bottom-[10%] right-[15%] blur-3xl animate-pulse-slower -z-10" />

            {/* Logo */}
            <div className="mb-2 flex justify-center w-full">
                <img
                    src={Logo}
                    alt="PhantomDrop Logo"
                    className="h-52 animate-float"
                />
            </div>

            {/* Brand Name */}
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-500 text-transparent bg-clip-text mb-6 tracking-tight animate-fade-in">
                PhantomDrop
            </h2>

            <h2 className="text-2xl text-gray-300 mb-3 animate-fade-in delay-100">
                By Anuj Anthwal
            </h2>

            <div className="flex gap-4 text-gray-400 animate-fade-in delay-200">
                <a href="https://www.linkedin.com/in/anuj-anthwal/" className="hover:text-cyan-400" target='_blank'>LinkedIn</a>
                ||
                <a href="https://github.com/Anujanthwal-dotcom" className="hover:text-purple-400" target='_blank'>Github</a>
            </div>


            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-semibold text-center leading-tight tracking-tight animate-fade-in delay-100">
                Transfer files with <span className="text-white">ease</span> &{' '}
                <span
                    className={`inline-block bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent transition-opacity duration-500 ease-in-out ${fade ? "opacity-100" : "opacity-0"
                        }`}
                >
                    {words[index]}
                </span>
            </h1>

            {/* Subheading */}
            <p className="mt-4 text-center text-neutral-400 text-lg md:text-xl max-w-xl animate-fade-in delay-200">
                A blazing fast centralized file sharing platform built for the modern web.
            </p>

            {/* CTA Buttons */}
            <div className="mt-20 flex flex-wrap justify-center gap-6 w-full animate-fade-in delay-300">
                <div className="w-full max-w-2xl flex flex-col md:flex-row justify-between gap-4">
                    <button
                        onClick={() => dispatch(setSendActive(true))}
                        className="w-full md:w-auto px-8 py-4 text-2xl font-medium rounded-full border border-white/20 bg-neutral-800 text-white hover:border-white/40 hover:shadow-[0_0_25px_5px_rgba(255,255,255,0.1)] cursor-pointer transition-all duration-300"
                    >
                        Send
                    </button>
                    <button
                        onClick={() => dispatch(setReceiveActive(true))}
                        className="w-full md:w-auto px-8 py-4 text-2xl font-medium rounded-full border border-white/20 bg-neutral-800 text-white hover:border-white/40 hover:shadow-[0_0_25px_5px_rgba(255,255,255,0.1)] cursor-pointer transition-all duration-300"
                    >
                        Receive
                    </button>
                </div>
            </div>

            {/* Keyframe animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes pulseSlow {
                    0%, 100% { transform: scale(1); opacity: 0.15; }
                    50% { transform: scale(1.1); opacity: 0.25; }
                }

                .animate-float {
                    animation: float 5s ease-in-out infinite;
                }

                .animate-fade-in {
                    animation: fadeIn 1s ease-out forwards;
                    opacity: 0;
                }

                .delay-100 {
                    animation-delay: 0.1s;
                }

                .delay-200 {
                    animation-delay: 0.2s;
                }

                .delay-300 {
                    animation-delay: 0.3s;
                }

                .animate-pulse-slow {
                    animation: pulseSlow 8s ease-in-out infinite;
                }

                .animate-pulse-slower {
                    animation: pulseSlow 12s ease-in-out infinite;
                }
            `}</style>



            {
                (sendActive === true) ? <div><SendPage /></div> : <div></div>
            }

            {
                (receiveActive === true) ? <div><ReceivePage /></div> : <div></div>
            }

        </div>
    );
}

export default MainSection;
