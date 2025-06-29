import multer from 'multer';
import path from 'path';
import type { Request} from 'express';
import fs from 'fs';
// For destination and filename callback
type Callback = (error: Error | null, destination: string) => void;

const storage: multer.StorageEngine = multer.diskStorage({
    destination: (request:Request,file:Express.Multer.File,callback:Callback)=>{
        if(!fs.existsSync(String(process.env.STORAGE_PATH))){
            fs.mkdirSync(String(process.env.STORAGE_PATH), { recursive: true });
        }
        callback(null, path.join(String(process.env.STORAGE_PATH)));
    },
    filename: (request:Request,file:Express.Multer.File,callback:Callback)=>{
        
        const fileName = `${Date.now()}-${file.originalname.split(' ').join('-')}`;
        callback(null, fileName);
    }
})

const upload: multer.Multer = multer({storage:storage})
export default upload;