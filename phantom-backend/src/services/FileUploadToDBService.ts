import Code from "../models/code";
import File from "../models/file";
import { customAlphabet } from "nanoid";
export class FileUploadToDBService {
    static async uploadFile(file: Express.Multer.File): Promise<string> {
        //generate a unique code for the file
        const codeList = await Code.find({});

        let code = '';
        const nanoid = customAlphabet('0123456789', 8);
        while(code === ''){
            let tempCode = nanoid();
            if (!codeList.some(existingCode => existingCode.code === tempCode)) {
                code = tempCode;
            }
        }
        //create a new file entry in the database
        const newFile = new File({
            code:code,
            filename: file.originalname,
            filepath: file.path,
        })

        const newCode = new Code({code: code})
        await newFile.save();
        await newCode.save();
        return code;
    }
}