const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')

const BlogsController = require('../controllers/blogsController')

// Create a blog
router.post('/', checkAuth, BlogsController.blogs_create)

// Get all blogs
router.get('/', BlogsController.blogs_get_all)

// Get a blog
router.get('/:blogId', BlogsController.blogs_get)

// Update a blog
router.patch('/:blogId', checkAuth, BlogsController.blogs_update)

// Delete a blog
router.delete('/:blogId', checkAuth, BlogsController.blogs_delete)

// Delete all blogs
router.delete('/', checkAuth, BlogsController.blogs_delete_all)

module.exports = router