const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')

const UsersController = require('../controllers/usersController')

// Sign up user
router.post('/signup', UsersController.users_signup)

// Sign in user and generate JWT
router.post('/signin', UsersController.users_signin)

// Delete user account
router.delete('/:userId', checkAuth, UsersController.users_delete)

// Get all users
router.get('/', checkAuth, UsersController.users_get_all)

// Get user
router.get('/:userId', UsersController.users_get)

module.exports = router
