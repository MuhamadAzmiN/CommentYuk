import { prismaClient } from "../app/database.js";

export const profile = async (req, res) => {
    try {
        res.status(200).json(req.user)
    }catch(e){
        console.log('Error: ', e.message);
        res.status(500).json({ message : "INTERNAL SERVER ERROR"})
    }
}

export const userPost = async (req, res) => {
    try {
        const result = await prismaClient.post.findMany({
            where : {
                authorId : req.user.id
            },
            select : {
                title : true,
                description : true,
                content : true,
                createdAt : true
            }
        })

        if(result.length == 0) {
            return res.status(400).json({message: "Post not found"})
        }

        return res.status(200).json(result)
    }catch(error){
        console.log('Error: ', error.message);
        res.status(500).json({ message : "INTERNAL SERVER ERROR"})
    }
}

export const UserPostDelete = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id
        const post = await prismaClient.post.findUnique({
            where : {
                id : id
            }
        })

        if(!post) {
            return res.status(400).json({message: "Post not found"})
        }

        if(post.authorId != userId) {
            return res.status(400).json({message: "Post not found"})
        }

        await prismaClient.post.delete({
            where : {
                id : id
            }
        })

        return res.status(200).json({message: "Post deleted successfully"})
        
    }catch(error){
        console.log('Error: ', error.message);
        res.status(500).json({ message : "INTERNAL SERVER ERROR"})
    }
}
