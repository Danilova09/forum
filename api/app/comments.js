const express = require('express');
const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        if (req.query.postId) {
            const comments = await Comment.find({post: req.query.postId}).populate('user').populate('post');
            return res.send(comments);
        }
        const comments = await Comment.find().populate('user').populate('post');
        return res.send(comments);
    } catch (error) {
        next(error);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const commentData = {
            user: req.body.user,
            post: req.body.post,
            message: req.body.message,
        }

        const comment = new Comment(commentData);
        await comment.save();

        return res.send(comment);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

module.exports = router;