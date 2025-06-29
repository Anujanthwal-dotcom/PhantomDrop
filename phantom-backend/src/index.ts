import express from 'express';
import dotenv from 'dotenv';
import connectDB from './connections/conn';
import uploadRouter from './controllers/FileUploadController';
import downloadRouter from './controllers/FileDownloadController';
import cors from 'cors';
dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Disposition'],
}))

app.use(express.json());
app.use('/upload', uploadRouter);
app.use('/download', downloadRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});