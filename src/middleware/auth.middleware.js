import { prismaClient } from "../app/database.js";
import jwt from "jsonwebtoken"


export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message: "Unauthorized"})
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        
        
        if(!decode){
            return res.status(401).json({message: "Unauthorized"})
        }


        const user = await prismaClient.user.findFirst({
            where : {
                id : decode.userId
            },
            select : {
                username : true,
                email : true,
                id : true,
                rayon : true
            }
        })

        if(!user){
            return res.status(401).json({message: "Unauthorized"})
        }
        req.user = user

        next()
    }catch(e){
        console.log("Error in protecRoute middleware" + e)
        res.status(401).json({message: "Unauthorized"})
    }
}