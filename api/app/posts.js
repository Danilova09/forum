const express = require('express');
const mongoose = require("mongoose");
const multer = require('multer');
const {nanoid} = require('nanoid');
const Post = require("../models/Post");
const config = require('../config');
const path = require("path");
const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.find();
        return res.send(posts);
    } catch (error) {
        next(error);
    }
});


router.post('/', upload.single('image') ,async (req, res, next) => {
    try {
        console.log(req.body);
        const postData = {
            title: req.body.title,
            description: req.body.description,
            image: null,
        }

        if (req.file) {
            postData.image = req.file.filename;
        }

        const post = new Post(postData);

        await post.save();

        return res.send(post);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

module.exports = router;