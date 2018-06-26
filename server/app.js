const express = require('express');

const app = express();

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

app.use('/api/posts', (req, res, next) => {
  const posts = [{
      id: "fadf12421l",
      title: "First server-side post",
      content: "this is coming from the server"
    },
    {
      id: "bb234j2k3n",
      title: "Second server-side post",
      content: "this is coming from the server"
    },
    {
      id: "kn32432jn",
      title: "Third server-side post",
      content: "this is coming from the server"
    },
    {
      id: "knkn34242nk32",
      title: "Fourth server-side post",
      content: "this is coming from the server"
    },
    {
      id: "knjn234jnn32",
      title: "Fifth server-side post",
      content: "this is coming from the server"
    }
  ]
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;