import { Router } from "express";
import { FileUploadToDBService } from "../services/FileUploadToDBService";
import type { Request, Response } from "express";
import upload from "../middlewares/FileUploadMiddleware";
const uploadRouter = Router();
import fs from "fs";
import encryptFile from "../services/FileEncryptionService";



uploadRouter.post('/', upload.single('file'), async (req: Request, res: Response): Promise<any> => {
    const file = req.file;// file metadata

    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const originalFilePath = file.path;
    const encryptFilepath = `${process.env.ENCRYPTED_STORAGE_PATH}`;

    const transformedFile = await encryptFile(file, encryptFilepath);

    fs.unlink(originalFilePath, (err) => {
        if (err) {
            console.error("Error deleting temporary file:", err);
        } else {
            console.log("Temporary file deleted successfully");
        }
    });

    setTimeout(() => {
        fs.unlink(transformedFile.path,(err)=>{
            if(err){
                console.log("error deleting file")
            } else{
                console.log("Encrypted File deleted "+transformedFile.path)
            }
        })
    }, 10*60*1000);

    try {
        const code = await FileUploadToDBService.uploadFile(transformedFile);
        return res.status(200).json({ code: code, fileName: file.filename });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ error: "Failed to upload file", details: errorMessage });
    }

});

export default uploadRouter;