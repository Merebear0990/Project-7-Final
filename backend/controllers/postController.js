const fs = require('fs');
const { Post } = require('../models');




// get ALL posts
exports.getAllPosts = (req, res, next) => {
  Post.findAll(
    { order: [["createdAt", "DESC"]] }
  ).then(
    posts => {
      console.log(posts)
      res.status(200).json(posts)
    })
}



// Mark readby
exports.setReadby = async(req, res, next) => {
  views = [...views, userId]
    console.log(views)
    await Post.update({views})
    await Post.save(); res.status(200).send({ success: "OK" });
  console.log('post has been read')
  return res.status(200).json(Post)
}




// CREATE POST
exports.addPost = (req, res, next) => {
  let post;
  // if there is an image upload
  if (req.file) {
    req.body.post = JSON.parse(req.body.post);
    const url = req.protocol + '://' + req.get('host')
    post = {
      userId: req.body.post.userId,
      message: req.body.post.message,
      image: url + '/images/' + req.file.filename,
      userId: req.auth.userId
    }
    pool.query(`SELECT * FROM users WHERE userid = $1`,
      [req.auth.userId],
      (error) => {
        if (error) {
          return res.status(401).json({
            error: error,
          });
        }
        pool.query(`INSERT INTO "posts"(title, author, posttext, image, userId ) VALUES ($1, $2, $3, $4, $5)`,
          [post.title, post.author, post.postText, post.image, req.auth.userId],
          error => {
            if (error) {
              return res.status(401).json({
                error: error
              })
            }
            console.log(req.body)
            console.log('Post saved successfully')
            return res.status(200).json(post);
          }
        )
      })
  } else {
    // no image upload
    post = {
      author: req.body.author,
      message: req.body.message,
      userId: req.auth.userId
    }
    console.log('Jalepeno')

    pool.query(`INSERT INTO "posts"(title, author, posttext, userid) VALUES ($1, $2, $3, $4)`,
      [post.title, post.author, post.postText, req.auth.userId],
      error => {
        if (error) {
          return res.status(401).json({
            error: error
          })
        }
        console.log('Post saved successfully')
        return res.status(201).json(post);
      }
    )
  }
}

// GET ONE POST
exports.getOnePost = (req, res, next) => {
  pool.query(`SELECT * FROM "posts" WHERE postid = $1`,
    [req.params.id],
    (error, post) => {
      if (error) {
        res.status(401).json({
          error: error,
        });
      }
      console.log(post.rows)
      return res.status(201).json(post.rows);
    }
  )
}