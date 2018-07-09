const express = require('express');
const Post = require('../models/post');

const router = express.Router();


router.post('', async (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    const result = await post.save();
    console.log(result);
    res.status(201).json({
        message: 'post added successfully',
        postId: result._id,
    });
});

router.get('', async (req, res, next) => {
    const posts = await Post.find();
    res.status(200).json({
        message: 'Posts fetched successfully',
        posts: posts
    });
});

router.get('/:id', async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        res.status(200).json({
            post: post
        });
    } else {
        res.status(404).json({
            message: 'Posts fetched successfully'
        });
    }

});

router.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        console.log(result);
        res.status(200).json({ message: "Update successful!" });
    });
});

router.delete("/:id", async (req, res, next) => {
    await Post.deleteOne({
        _id: req.params.id
    })
    res.status(200).json({
        message: 'Post Deleted !'
    });
})

module.exports = router;