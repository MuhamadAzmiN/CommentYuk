import { prismaClient } from "../app/database.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"
export const register = async (req, res) => {
    const { username , email, password, rayon } = req.body
    try {

        if(!username || !email || !password || !rayon){
            return res.status(400).json({message: "All fields are required"})
        }


        if(password.length < 6){
            return res.status(400).json({ message : "Password must be at least 6 characters" })
        }
        

        const user = await prismaClient.user.findFirst({
            where : {
                email : email
            }
        })

        if(user){
            return res.status(400).json({message: "User already exists"})
        }

    


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await prismaClient.user.create({
            data : {
                username,
                email,
                password : hashedPassword,
                rayon
            }
        })


    
        


        if(newUser) {
           generateToken(newUser.id, res)
           res.status(201).json({
                id : newUser.id,
                username : newUser.username,
                email : newUser.email,
                rayon : newUser.rayon
           })
        }else {
            res.status(500).json({message: "Something went wrong"})
        }
    }catch(e){
        console.log('Error: ', e.message);  
    }
}

export const login = async (req, res) => {
    const {email, password } = req.body        
    try {
        const user = await prismaClient.user.findFirst({
            where : {
                email : email
            },
           
        })
        
        if(!user){
            res.status(400).json({message: "Invalid Credientials"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) {
            res.status(400).json({message: "Invalid Credientials"})
        }

        generateToken(user.id, res)
        res.status(200).json({
            username : user.username,
            email : user.email
        })
    }catch(e) {
        console.log('Error: ', e.message);
        res.status(500).json({ message : "INTERNAL SERVER ERROR"})
        
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge : 0})
        res.status(200).json({message: "Logout successfully"})
    }catch(error){
        console.log('Error: ', error.message);
        res.status(500).json({ message : "INTERNAL SERVER ERROR"})
    }
}




