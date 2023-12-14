const mongoose = require('mongoose')
const Blog = require('../models/blogs')

exports.blogs_get_all = (req, res, next) => {
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
}

exports.blogs_create = (req, res, next) => {
  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    snippet: req.body.snippet,
    content: req.body.content,
    category: req.body.category,
    likes: req.body.likes,
    author: req.userData.userId
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
}

exports.blogs_get = (req, res, next) => {
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
}

exports.blogs_update = (req, res, next) => {
  const id = req.params.blogId

  const updateOps = {}

  for (let i in req.body) {
    const op = req.body[i]
    updateOps[op.propName] = op.value
  }

  Blog.findByIdAndUpdate(id, { $set: updateOps }, { new: true })
    .select('-__v')
    .then(blog => {
      res.status(200).json(blog)
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.blogs_delete = (req, res, next) => {
  const id = req.params.blogId

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.status(200).json({
        message: 'Blog deleted successfully'
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.blogs_delete_all = (req, res, next) => {
    Blog.deleteMany()
    .then(result => {
      res.status(200).json({
        message: 'All blogs were successfully deleted'
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
  }