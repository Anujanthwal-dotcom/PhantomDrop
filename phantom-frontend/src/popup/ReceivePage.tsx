import { useState } from "react";
import { useDispatch } from "react-redux";
import { setReceiveDeactive } from "../redux/receiveSlice";
import axios from "axios";
import BASE from "../baseurl/BaseURL";
function ReceivePage() {
  const [codeArray, setCodeArray] = useState<number[]>(Array(8).fill(-1));
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(setReceiveDeactive(false));
    }, 300); // Match transition duration
  };

  const handleReceive = async () => {
    if (codeArray.some(num => num === -1)) {
      return;
    }

    const code = codeArray.join('');

    try {
      // Call your API or service to handle the received code
      const response = await axios.get(`${BASE}/download/${code}`, {
        responseType: 'blob', // 👈 VERY IMPORTANT
      });

      console.log(response)
      // Create a blob URL
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // Try to get filename from headers
      const contentDisposition = response.headers['content-disposition'];
      let fileName = "downloaded_file";

      if (contentDisposition) {
        const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (match && match[1]) {
          fileName = match[1].replace(/['"]/g, '');
        }
      }


      // Create anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error receiving code:", error);
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
        } bg-black/40 backdrop-blur-sm`}
    >
      <div
        className={`bg-neutral-900/80 border border-white/10 p-6 rounded-2xl shadow-lg text-white flex flex-col transform transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 text-transparent bg-clip-text tracking-tight leading-tight">
          Enter 8-Digit Code
        </h2>

        {/* 8 Digit Input Boxes */}
        <div className="flex justify-between gap-2 mb-8 px-2">
          {[...Array(8)].map((_, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              inputMode="numeric"
              className="w-12 h-14 rounded-md text-center text-2xl font-bold bg-neutral-800 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              onChange={(e) => {
                const target = e.currentTarget;
                const value = parseInt(target.value);
                setCodeArray((prev) =>
                  prev.map((num, i) => (i === idx ? value : num))
                );
                if (target.value.length === 1) {
                  const next = target.nextElementSibling as HTMLInputElement | null;
                  next?.focus();
                }
              }}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleClose}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 hover:cursor-pointer transition-all shadow-md text-lg font-semibold"
          >
            Cancel
          </button>
          <button onClick={handleReceive} className="px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:opacity-90 hover:cursor-pointer transition-all shadow-md text-lg font-semibold">
            Receive
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReceivePage;
