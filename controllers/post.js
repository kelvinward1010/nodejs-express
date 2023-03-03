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

// update anyway
const updatePostAnyWay = async (req, res, next) => {
    try {
        const postUpdate = await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        res.status(201).json(postUpdate)
    } catch (error) {
        res.status(500).json(error)
        next(error)
    }
}

//update follow username
const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username == req.body.username) {
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


// delete anyway
const deletePostAnyWay = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        const deletePost = await post.delete();
        res.status(200).json(deletePost)
        console.log("Post delete by delete anyway")
    } catch (error) {
        res.status(500).json(error)
        next(error)
    }
}

// delete follow username
const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username == req.body.username){
            try {
                await post.delete();
                res.status(200).json("Post has been delete!")
            } catch (error) {
                res.status(500).json(error)
            }
        }
    } catch (error) {
        res.status(500).json(error)
        next(error)
    }
}


const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error);
        next(error)
    }
}

const getAllPost = async (req, res, next) => {
    const username = req.query.user;
    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        }else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
        next(error)
    }
}

module.exports = {
    createPost,
    updatePostAnyWay,
    updatePost,
    deletePostAnyWay,
    deletePost,
    getPost,
    getAllPost,
}