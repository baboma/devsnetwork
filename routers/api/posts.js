const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load Post Model
const Post = require('../../models/Post')

// Load Profile Model
const Profile = require('../../models/Profile')

// Load Validation
const validatePostInput = require('../../validation/post')


// @Route   GET api/posts/test
// @Desc    Tests posts route
// @Access  Public route
router.get('/test', (req, res) => res.json({
  msg: "Posts works"
}))

// @Route   GET api/posts
// @Desc    Get all posts
// @Access  Public route
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (err) {
    res.status(404).json({ nopostsfound: "No posts found." })
  }
})

// @Route   GET api/posts/:id
// @Desc    Get post by id
// @Access  Public route
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.json(post)
  } catch (err) {
    res.status(404).json({ nopostfound: "No post found." })
  }
})

// @Route   POST api/posts
// @Desc    Create post
// @Access  Private route
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)

  //Check Validation
  if (!isValid) {
    //return any errors with 400 status
    return res.status(400).json(errors)
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  })

  const post = await newPost.save()
  res.json(post)
})

// @Route   DELETE api/posts/:id
// @Desc    Delete a post
// @Access  Private route
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await Profile.findOne({ user: req.user.id })
    const post = await Post.findById(req.params.id)
    // Check for post owner
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ notauthorized: "User not authorized." })
    }
    // Delete
    await post.remove()
    res.json({ success: true })
  } catch (err) {
    res.status(404).json({ postnotfound: "No post found." })
  }
})

// @Route   POST api/posts/like/:id
// @Desc    Like a post
// @Access  Private route
router.post('/like/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await Profile.findOne({ user: req.user.id })
    const post = await Post.findById(req.params.id)
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ alreadyliked: "User already liked this post." })
    }
    // Add a user id to likes array
    post.likes.unshift({ user: req.user.id })
    // Save
    const postSaved = post.save()
    res.json(postSaved)
  } catch (err) {
    res.status(404).json({ nolikefound: "Post to like not found." })
  }
})

// @Route   POST api/posts/unlike/:id
// @Desc    Unlike a post
// @Access  Private route
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await Profile.findOne({ user: req.user.id })
    const post = await Post.findById(req.params.id)
    if (post.likes.filter(like => like.user.toString() === req.user.id) === 0) {
      return res.status(400).json({ notliked: "You have not yet liked this post." })
    }
    // Get remove index
    const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id)
    // Splice out of array
    post.likes.splice(removeIndex, 1)
    // Save
    const postSaved = post.save()
    res.json(postSaved)
  } catch (err) {
    res.status(404).json({ nounlikefound: "Post to unlike not found." })
  }
})

// @Route   POST api/posts/comment/:id
// @Desc    Add comment to a post
// @Access  Private route
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)
  //Check Validation
  if (!isValid) {
    //return any errors with 400 status
    return res.status(400).json(errors)
  }

  try {
    const post = await Post.findById(req.params.id)
    const newComment = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    }
    // Add to comment array
    post.comments.unshift(newComment)
    // Save
    const postSaved = await post.save()
    res.json(postSaved)
  } catch (err) {
    res.status(404).json({ postnotfound: "Post not found." })
  }
})

// @Route   DELETE api/posts/comment/:id/:comment_id
// @Desc    Remove comment to a post
// @Access  Private route
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    // Check to see if comment exists
    if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
      return res.status(404).json({
        commentnotexists: "Comment not found."
      })
    }
    //Get remove index
    const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id)
    // Splice out of array
    post.comments.splice(removeIndex, 1)
    // Save
    const postSaved = await post.save()
    res.json(postSaved)
  } catch (err) {
    res.status(404).json({ commentnotfound: "Comment not found." })
  }
})

module.exports = router