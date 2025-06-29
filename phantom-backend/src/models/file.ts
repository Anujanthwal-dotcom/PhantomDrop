import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    code: {type:String, required: true},
    filename: { type: String, required: true },
    filepath: { type: String, required: true },
    createdAt: { 
        type: Date, 
        default: Date.now,
        expires: '10m' 
    }
});

const File = mongoose.model("File", fileSchema);

export default File;
