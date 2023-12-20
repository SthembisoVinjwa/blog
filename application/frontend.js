const axios = require('axios')
const express = require('express')
const app = express()

const path = require('path')
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()

app.use(cors())

axios.defaults.baseURL = process.env.API_BASE_URL;

// Set view engine
app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')

// static files
app.use(express.static('./application/public'))

app.get('/', (req, res, next) => {
  axios.get('blogs')
  .then(response => {
    res.render('card', {count: response.data.count, blogs: response.data.blogs})
  })
  .catch(err => {
    res.status(500).json({
      message: err
    })
  })

})

module.exports = app
