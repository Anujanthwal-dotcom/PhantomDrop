import { Router } from "express";
import { FileDownloadFromDBService } from "../services/FileDownloadFromDBService";
import downloadLimiter from "../middlewares/FileDownloadMiddleware";
import type { Request, Response } from "express";
const downloadRouter = Router();
import fs from "fs";
import crypto from 'crypto';
import path from 'path';
import { pipeline } from "stream/promises";
import dotenv from 'dotenv';
dotenv.config();

downloadRouter.get('/:code', downloadLimiter, async (req: Request, res: Response): Promise<any> => {
    const code = req.params.code;

    try {
        const file = await FileDownloadFromDBService.downloadFile(code);

        if (!file) {
            return res.status(404).json({ error: "File not found" });
        }


        const inputPath = file.filepath


        const algorithm: string = 'aes-256-cbc'
        const key = Buffer.from(process.env.ENCRYPTION_KEY || '', 'utf-8') // Must be 32 bytes for AES-256
        const iv = Buffer.from(process.env.ENCRYPTION_IV || '', 'utf-8') // Must be 16 bytes for AES-256-CBC

        res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
        res.setHeader('Content-Type', file.mimetype || 'application/octet-stream');


        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        const input = fs.createReadStream(inputPath);

        await pipeline(
            input,
            decipher,
            res
        );

        console.log(`✅ File "${file.filename}" decrypted and sent`);

        // Optionally, delete the file after download
        setTimeout(() => {
            fs.unlink(inputPath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error("Error deleting file:", unlinkErr);
                } else {
                    console.log("File deleted successfully after download");
                }
            });
        }, 1000);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ error: "Failed", details: errorMessage });
    }
});


export default downloadRouter;


