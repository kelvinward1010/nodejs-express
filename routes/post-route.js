const express = require('express');
const { createPost, updatePost } = require('../controllers/post');


const router = express.Router();

router.post('/create-post', createPost);
router.put('/update-post/:id', updatePost);

module.exports = router;