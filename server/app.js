const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
const app = express();

mongoose.connect('mongodb+srv://alphadever:HiMWiILfEgL8k6qT@cluster0-v4dyf.mongodb.net/node-angular?retryWrites=true')
  .then(() => {
    console.log('Connected to database !');
  })
  .catch(() => {
    console.log('Connection failed !');
  });

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", async (req, res, next) => {
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

app.get('/api/posts', async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

app.get('/api/posts/:id', async (req, res, next) => {
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

app.put("/api/posts/:id", (req, res, next) => {
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

app.delete("/api/posts/:id", async (req, res, next) => {
  await Post.deleteOne({
    _id: req.params.id
  })
  res.status(200).json({
    message: 'Post Deleted !'
  });
})

module.exports = app;