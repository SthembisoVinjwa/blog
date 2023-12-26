const axios = require('axios')
const express = require('express')
const app = express()

const path = require('path')
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()

app.use(cors())

axios.defaults.baseURL = process.env.API_BASE_URL

// Set view engine
app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')

// static files
app.use(express.static('./application/public'))

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
        process.env.API_BASE_URL + '' + response.data.blogs[i].author.userAvatar
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

module.exports = app
