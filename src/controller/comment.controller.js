import Comment from "../model/comment.model.js";

export const comment = async (req, res) => {
    try {
        const { text } = req.body;
        const comment = await Comment.create({ text });
        res.status(201).json(comment);
    }catch(e){
        res.status(500).json({ error: e.message });
        console.log(`Error: ${e.message}`);
    }
}


export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find()
        res.status(200).json(comments);
    }catch(e){
        res.status(500).json({ error: e.message });
        console.log(`Error: ${e.message}`);
    }
}

export const deleteAllComments = async (req, res) => {
    try {
        const comments = await Comment.deleteMany();
        res.status(200).json(comments);
    }catch(e){
        res.status(500).json({ error: e.message });
        console.log(`Error: ${e.message}`);
    }
}