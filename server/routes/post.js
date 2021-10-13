const Post = require('../models/post');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

//@route /api/post
//desc get all skill
//access private

router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate('user', [
      'username',
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'internal server error' });
  }
});

//@route /api/post
//desc create a new post
//access private

router.post('/', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //simple skill's validation
  if (!title) {
    return res.status(400).json({ success: false, message: 'Missing field' });
  }

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith('http://') ? url : `http://${url}`,
      status: status || 'To learn',
      user: req.userId,
    });
    await newPost.save();

    res.json({
      success: true,
      message: `let's learn your skill`,
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'internal server error' });
  }
});

//@route /api/post
//desc update a new skill
//access private

router.put('/:id', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: 'Title is required' });
  }
  try {
    let updatePost = {
      title,
      description,
      url: url.startsWith('http://') ? `http://${url}` : `http://${url}`,
      status: status || 'To learn',
    };
    const updatePostCondition = { _id: req.params.id, user: req.userId };
    const updatedPost = await Post.findOneAndUpdate(
      updatePostCondition,
      updatePost,
      { new: true } //
    );

    // User not authorise or not found post
    if (!updatedPost) {
      return res.status(401).json({
        success: false,
        message: 'User not authorise or not found post',
      });
    }
    res.json({
      success: true,
      message: 'updatePost completed',
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' });
  }
});

//@route DELETE /api/post
//desc delete a skill
//access private

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletePostCondition = { _id: req.params.id, user: req.userId };
    const deletePost = await Post.findOneAndDelete(deletePostCondition);

    // User not authorise or not found post
    if (!deletePost) {
      return res.status(401).json({
        success: false,
        message: 'User not authorise or not found post',
      });
    }
    res.json({
      success: true,
      message: 'Delete post completed',
      post: deletePost,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
