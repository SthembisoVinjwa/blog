const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')
const BlogsController = require('../controllers/blogsController')

const multer = require('multer')

// Set File path and name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/blog')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

// Filter files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

// Add storage to upload ans set limits
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

// Create a blog
router.post('/', upload.single('blogImage'), BlogsController.blogs_create)

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