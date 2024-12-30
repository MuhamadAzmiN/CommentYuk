import { prismaClient } from "../app/database.js";
import jwt from "jsonwebtoken"


export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await prismaClient.user.findFirst({
            where: {
                id: decoded.userId
            }
        });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in authMiddleware:", error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        
        res.status(500).json({ message: "Internal server error" });
    }
}