const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Blog = require('../models/blogs')

// Create a blog
router.post('/', (req, res, next) => {
  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    snippet: req.body.snippet,
    content: req.body.content,
    category: req.body.category,
    likes: req.body.likes
  })

  blog
    .save()
    .then(blog => {
      res.status(201).json({
        message: 'Blog created successfully',
        created: blog
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

// Get all blogs
router.get('/', (req, res, next) => {
  Blog.find()
    .then(blogs => {
      res.status(200).json({
        count: blogs.length,
        blogs: blogs.map(blog => {
          return {
            _id: blog._id,
            title: blog.title,
            snippet: blog.snippet,
            category: blog.category
          }
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

// Get a blog
router.get('/:blogId', (req, res, next) => {
  const id = req.params.blogId
  
  Blog.findById(id)
  .select('-__v')
  .then(blog => {
    res.status(200).json(blog)
  })
  .catch(err => {
    res.status(500).json({
        error: err
    })
  })
})

// Update a blog
router.patch('/:blogId', (req, res, next) => {
  res.status(200).json({
    message: 'Blog updated'
  })
})

// Delete a blog
router.delete('/:blogId', (req, res, next) => {
  res.status(200).json({
    message: 'Blog deleted'
  })
})

module.exports = router
