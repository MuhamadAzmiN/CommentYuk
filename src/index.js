
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import { web } from "./app/web.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

web.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await connectDB();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
});






