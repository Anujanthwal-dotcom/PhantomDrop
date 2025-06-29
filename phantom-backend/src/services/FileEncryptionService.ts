import crypto from 'crypto'
import fs from 'fs'
import { Buffer } from 'node:buffer';
import dotenv from 'dotenv'
import { promisify } from "util";
import stream from "stream";
const pipeline = promisify(stream.pipeline);

dotenv.config()

const algorithm:string = 'aes-256-cbc'
const key = Buffer.from(process.env.ENCRYPTION_KEY || '','utf-8') // Must be 32 bytes for AES-256
const iv = Buffer.from(process.env.ENCRYPTION_IV || '','utf-8') // Must be 16 bytes for AES-256-CBC

async function encryptFile(file:Express.Multer.File, outputDir:string): Promise<Express.Multer.File> {
    const originalFilePath = file.path
    const cipher = crypto.createCipheriv(algorithm, key, iv)

    if(!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    const outputPath = `${outputDir}/${file.filename}.enc` // Append .enc to the filename for encrypted files
    const input = fs.createReadStream(originalFilePath)
    const output = fs.createWriteStream(outputPath)

    await pipeline(
        input,      // Readable stream (file)
        cipher,     // Transform stream (encryption)
        output      // Writable stream (output file)
    )

    console.log(`✅ File "${file.filename}" encrypted and saved to "${outputPath}"`)
    file.path = outputPath
    return file
}

export default encryptFile