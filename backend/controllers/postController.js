const fs = require('fs');
const { Post } = require('../models');
const { post } = require('../routes/userRoutes');




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
exports.setReadby = async (req, res, next) => {
  const postId = req.params.id;
  Post.findOne({
    where: {
      id: postId
    }

  }).then(post => {
    if (!post.readBy.includes(req.body.userId)) {
      // post.readBy.push(req.body.userId)
      post.readBy = [...post.readBy, req.body.userId];
    }
    post.save().then(() => res.status(201).json({ message: 'Post saved Successfully' }))

  }).catch(
    error => res.status(500).json({ error: error.message || error })
  )

}

//TODO save the changes with sequilize
//TODO add a catch for errors

// views = [...views, userId]
// console.log(views)
// await Post.update({ views })
// await Post.save(); res.status(200).send({ success: "OK" });
// console.log('post has been read')
// return res.status(200).json(Post)





// CREATE POST
exports.addPost = (req, res, next) => {

  // if there is an image upload
  if (req.file) {
    const parsedPost = JSON.parse(req.body.post);
    const url = req.protocol + '://' + req.get('host')

    Post.create({
      message: parsedPost.message,
      mediaUrl: url + '/images/' + req.file.filename,
      userId: parsedPost.userId,
      readBy: []
    }).then(
      () => res.status(201).json({ message: 'Post saved Successfully' })
    ).catch(
      error => res.status(500).json({ error: error.message || error })
    )


  } else {
    // no image upload
    Post.create({
      message: req.body.message,
      userId: req.auth.userId,
      readBy: []

    }).then(
      () => res.status(201).json({ message: 'Post saved successfully' })
    ).catch(
      error => res.status(500).json({ error: error.message || error })
    )
  }
}
//TODO remove
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