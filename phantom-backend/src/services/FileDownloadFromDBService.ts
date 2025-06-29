import File from "../models/file";
import Code from "../models/code";
import fs from "fs";
export class FileDownloadFromDBService {
    static async downloadFile(code: string): Promise<any> {
        const file = await File.findOne({code:code});

        if (!file) {
            throw new Error("File not found");
        }
        const path = file.filepath;

        if(!fs.existsSync(path)) {
            throw new Error("File does not exist on the server");
        }

        await Code.deleteOne({code:code});
        await File.deleteOne({code:code});
        return file;        
    }
}