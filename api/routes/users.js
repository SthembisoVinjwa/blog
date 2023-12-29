const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')

const UsersController = require('../controllers/usersController')

const multer = require('multer')

// Set File path and name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/avatar')
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

// Verify token
router.get('/verify', checkAuth, UsersController.users_verify)

// Sign up user
router.post('/signup', upload.single('userAvatar'), UsersController.users_signup)

// Sign in user and generate JWT
router.post('/signin', UsersController.users_signin)

// Delete user account
router.delete('/:userId', checkAuth, UsersController.users_delete)

// Get all users
router.get('/', checkAuth, UsersController.users_get_all)

// Get user
router.get('/:userId', checkAuth, UsersController.users_get)

module.exports = router
