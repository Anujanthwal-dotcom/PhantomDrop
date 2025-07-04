import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(String(process.env.MONGO_URI));
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectDB;