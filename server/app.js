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
    "GET, POST, PATCH, DELETE, OPTIONS"
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

app.delete("/api/posts/:id", async (req, res, next) => {
  await Post.deleteOne({_id : req.params.id})
  res.status(200).json({
    message: 'Post Deleted !'
  });
})

module.exports = app;