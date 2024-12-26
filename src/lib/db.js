import mongoose, { mongo } from "mongoose";


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(e){
        console.log(`Error: ${e.message}`);
        
    }
}