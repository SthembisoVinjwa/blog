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

axios.defaults.baseURL = process.env.API_BASE_URL;

// Set view engine
app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')

// static files
app.use(express.static('./application/public'))

// Home
app.get('/', (req, res, next) => {
  axios.get('blogs')
  .then(response => {
    res.render('user/sign', {count: response.data.count, blogs: response.data.blogs})
  })
  .catch(err => {
    res.status(500).json({
      message: err
    })
  })

})

app.post('/signup', (req, res, next) => {
  console.log(req.body)
  res.status(200).json({
    message: 'ok'
  })
})

module.exports = app
