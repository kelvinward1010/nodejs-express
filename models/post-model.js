const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: false
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Post', postSchema);
