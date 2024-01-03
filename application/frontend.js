const axios = require('axios')
const express = require('express')
const app = express()

const path = require('path')
const cors = require('cors')

const bodyParser = require('body-parser')

const dotenv = require('dotenv')
dotenv.config()

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(cors())

axios.defaults.baseURL = "https://blogs-api-fcje.onrender.com/";

// Set view engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

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

// static files
app.use(express.static(path.join(__dirname, '/public')))

// Home
app.get('/', (req, res, next) => {
  axios
    .get('blogs')
    .then(response => {
      const index = Math.floor(Math.random() * 5)

      response.data.blogs[index].content = response.data.blogs[
        index
      ].content.replaceAll('\n', '<br>')

      for (let i = 0; i < response.data.blogs.length; i++) {
        response.data.blogs[i].author.userAvatar =
        "https://blogs-api-fcje.onrender.com/" + '' + response.data.blogs[i].author.userAvatar
      }

      res.render('card', {
        count: response.data.count,
        blogs: response.data.blogs,
        blogIndex: index
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
})

app.get('/signup', (req, res, next) => {
  res.render('user/sign')
})

app.get('/createBlog', (req, res, next) => {
  res.render('createBlog/blog')
})

app.get('/manage', (req, res, next) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'token': req.query.token
    }
  }

  axios.get('blogs/user', options)
  .then(response => {
    const blogs = response.data
    res.render('createBlog/manageBlog', {blogs: blogs})
  })
  .catch(error => {
    res.status(500).json({
      message: error
    })
  })
})

app.get('/viewBlog', (req, res, next) => {
  const blogId = req.query.blogId

  axios.get('blogs/' + blogId)
  .then(response => {
    const blog = response.data
    res.render('createBlog/viewBlog', {blog: blog})
  })
  .catch(error => {
    res.status(500).json({
      message: error
    })
  })
})

module.exports = app
