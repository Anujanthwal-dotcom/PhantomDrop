import CodeWindow from "./sendpagewindows/CodeWindow";
import SelectFileWindow from "./sendpagewindows/SelectFileWindow";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

function SendPage() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SelectFileWindow />} />
                    <Route path="/code" element={<CodeWindow />} />
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default SendPage;
