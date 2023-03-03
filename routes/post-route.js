const express = require('express');
const { createPost, updatePost, deletePostAnyWay, updatePostAnyWay, deletePost, getPost, getAllPost } = require('../controllers/post');


const router = express.Router();

router.post('/create-post', createPost);
router.put('/update-post/:id', updatePostAnyWay);
router.put('/update-post-follow-user/:id', updatePost);
router.delete('/delete-post/:id', deletePostAnyWay);
router.delete('/delete-post-follow-user/:id', deletePost);
router.get('/post/:id', getPost);
router.get('/allpost', getAllPost);

module.exports = router;