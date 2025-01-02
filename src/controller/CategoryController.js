import { prismaClient } from "../app/database.js";

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body

        const exists = await prismaClient.category.findUnique({
            where : {
                name : name
            }
        })

        if(exists) {
            return res.status(400).json({message: "Category already exists"})
        }


        const result = await prismaClient.category.create({
            data : {
                name : name,
                slug : name.replace(/\s+/g, '-').toLowerCase()
            }
        })


        

        res.status(201).json({ "message" : "created successfully" })
    }catch(error){
        console.log('Error: ', error.message);
        res.status(500).json({ message : "INTERNAL SERVER ERROR"})
    }

}

export const getCategory = async (req,res) => {
    try {
        const result = await prismaClient.category.findMany({
            select : {
                name : true,
                slug : true,
                id : true
            }
        })
        


        if(result.length == 0) {
            return res.status(400).json({message: "Category not found"})
        }

        return res.status(200).json(result)
    }catch(error){
        console.log('Error: ', error.message);
        return res.status(500).json({ message : "INTERNAL SERVER ERROR"})
    }
}