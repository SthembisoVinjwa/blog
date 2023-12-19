const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const bodyParser = require('body-parser')

const BlogsRouter = require('./api/routes/blogs')
const UsersRouter = require('./api/routes/users')

mongoose.connect(
  'mongodb+srv://vinjwacr7:' +
    process.env.MONGO_ATLAS_PW +
    '@clusterblog.yhj2x6y.mongodb.net/?retryWrites=true&w=majority'
)

app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

// Handle CORS
app.use((res, req, next) => {
  res.header('Access-Control-Allow-Origin', '*')

  res.header(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT POST GET DELETE PATCH')
    res.status(200).json({})
  }

  next()
})

app.use(morgan('tiny'))

app.use('/blogs', BlogsRouter)
app.use('/users', UsersRouter)

app.use((req, res, next) => {
  const err = new Error('Not found')
  res.status(404)
  next(err)
})

app.use((err, req, res, next) => {
  res.json({
    error: err.message
  })
})

module.exports = app
