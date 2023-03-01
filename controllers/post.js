const Post = require('../models/post-model');


const createPost = async (req, res, next) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost)
    } catch (error) {
        next(error)
    }
}

const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username == req.body.name) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, {new: true});
                res.status(201).json(updatedPost)
            } catch (error) {
                res.status(500).json(error)
            }
        }else{
            res.status(401).json('You can update only your post!')
        }
    } catch (error) {
        res.status(500).json(error)
        next(error)
    }
}

const deletePost = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

const getPost = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

const getAllPost = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
}