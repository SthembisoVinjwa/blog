const mongoose = require('mongoose')
const User = require('../models/users')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.users_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .then(users => {
      if (users.length === 0) {
        bcrypt
          .hash(req.body.password, 10)
          .then(hash => {
            const user = User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
              userAvatar: req.file.path
            })
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: 'User created successfully'
                })
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                })
              })
          })
          .catch(err => {
            res.status(500).json({
              error: err
            })
          })
      } else {
        return res.status(409).json({
          message: 'Email already exists'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.users_signin = (req, res, next) => {
  User.find({ email: req.body.email })
    .then(users => {
      const user = users[0]

      bcrypt
        .compare(req.body.password, user.password)
        .then(result => {
          if (result) {
            const token = jwt.sign(
              { userId: user._id, email: user.email },
              process.env.JWT_KEY,
              {
                expiresIn: '2h'
              }
            )

            res.status(200).json({
              message: 'Authentication successful',
              token: token
            })
          } else {
            res.status(401).json({
              message: 'Authentication failed'
            })
          }
        })
        .catch(err => {
          res.status(401).json({
            message: 'Authentication failed'
          })
        })
    })
    .catch(err => {
      res.status(401).json({
        message: 'Authentication failed'
      })
    })
}

exports.users_delete = (req, res, next) => {
  const id = req.params.userId

  if (id === req.userData.userId) {
    User.findByIdAndDelete(id)
      .then(result => {
        res.status(200).json({
          message: 'User deleted successfully'
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  } else {
    res.status(401).json({
      message: 'Unauthorized access'
    })
  }
}

exports.users_get_all = (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json({
        count: users.length,
        users: users.map(user => {
          return {
            _id: user._id,
            email: user.email,
            userAvatar: process.env.API_BASE_URL + "" + user.userAvatar
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

exports.users_get = (req, res, next) => {
  const id = req.params.userId

  User.findById(id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}
