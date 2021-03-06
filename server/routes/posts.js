const express = require('express');
const Post = require('../models/post');
const multer = require('multer');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'server/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('', multer({
  storage: storage
}).single('image'), async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename
  });
  const result = await post.save();
  console.log(result);
  res.status(201).json({
    post: {
      ...result,
      id: result._id,
    }
  });
});

router.get('', async (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  const posts = await postQuery;
  const count = await Post.count();
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts,
    maxPosts: count
  });
});

router.get('/:id', async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({
      message: 'Posts fetched successfully'
    });
  }

});

router.put("/:id", multer({
  storage: storage
}).single('image'), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });

  Post.updateOne({
    _id: req.params.id
  }, post).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Update successful!"
    });
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