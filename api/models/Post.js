const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    user: {

    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;