import { prismaClient } from "../app/database.js";
import cloudinary from "../lib/cloudinary.js";
export const create = async (req, res ) => {
    const { title, content, description, category } = req.body
    try {

        if(!title || !content || !description) {
            return res.status(400).json({message: "All fields are required"})
        }

        const foundCategory = await prismaClient.category.findUnique({
            where : {
                name : category
            }
        })


        if(!foundCategory) {
            return res.status(400).json({message: "Category not found"})
        }

        const uploadResponse = await cloudinary.uploader.upload(content)
        
        const result = await prismaClient.post.create({
            data : {
                title : title,
                content : uploadResponse.secure_url,
                description : description,
                authorId : req.user.id,
                categoryId : foundCategory.id
            }
        })
        if(!result) {
            res.status(400).json({message: "Post not created"})
        }

        res.status(200).json({ "message" : "created successfully" })
        
    }catch(e){
        console.log('Error: ', e.message);
        res.status(500).json({ message : "INTERNAL SERVER ERROR"})
    }
}


export const get = async (req, res) => {
    try {
        
        const result = await prismaClient.post.findMany({
            select : {
                id   : true,
                title : true,
                description : true,
                content : true,
                createdAt : true,
                updatedAt : true,
            },
            orderBy : {
                createdAt : "desc"
            }
        })


        if(result.length < 0) {
            res.status(400).json({message: "Post not found"})
        }

        res.status(200).json(result)        
    }catch(e){
        console.log("Error: ", e.message);
        res.status(500).json({ message : "INTERNAL SERVER ERROR"})
    }
}

export const getPostCategory = async (req, res) => {
    const { slug  } = req.params
    try {   
        const category = await prismaClient.category.findFirst({
            where : {
                slug : slug
            }
        })
        if(!category) {
            return  res.status(400).json({message: "Post not found"})
        }


        const posts = await prismaClient.post.findMany({
            where : {
                categoryId : category.id
            },
            select : {
                id   : true,
                title : true,
                description : true,
                content : true,
                createdAt : true,
                updatedAt : true
            },
            orderBy : {
                createdAt : "desc"
            }
        })


        console.log(posts)
        return res.status(200).json({posts})
        
       
    }catch(e){
        console.log("Error: ", e.message);
        res.status(500).json({"message" : "INTENAL SERVER ERROR"})
    }
}


export const detail = async (req, res) => {
    const { id } = req.params

    try {
        const result = await prismaClient.post.findUnique({
            where : {
                id : id
            },
            select : {
                id   : true,
                title : true,
                description : true,
                content : true,
                createdAt : true,
                updatedAt : true,
                author : {
                    select : {
                        username : true,
                        email : true,
                        profesi : true,
                        image : true
                    }
                }
            }
        })

        if(!result) {
            return  res.status(400).json({message: "Post not found"})
        }

        return res.status(200).json(result)
    }catch(e){
        console.log("Error: ", e.message);
        res.status(500).json({"message" : "INTENAL SERVER ERROR"})
    }
}

export const deleteAllPost = async (req, res) => {
    try {
        const result = await prismaClient.post.deleteMany({
            
        })
        res.status(200).json({"message" : "Post deleted successfully"})
    }catch(e){
        console.log("Error: ", e.message);
        res.status(500).json({"message" : "INTENAL SERVER ERROR"})
    }
}

