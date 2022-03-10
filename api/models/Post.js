const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        validate: {
            validator: async function () {
                return !!(this.image || this.description);
            },
            message: 'Image or description is required'
        }
    },
    image: {
        type: String,
        validate: {
            validator: async function () {
                return !!(this.image || this.description);
            },
            message: 'Image or description is required'
        }
    }
});


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;