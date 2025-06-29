import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    code: { type: String, required: true },
    createdAt: { 
        type: Date, 
        default: Date.now,
        expires: '10m' 
    }
});

const Code = mongoose.model("Code", codeSchema);

export default Code;
