import mongoose, { mongo } from "mongoose";


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(e){
        console.log(`Error: ${e.message}`);
        
    }
}