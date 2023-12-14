const express = require('express')
const app = express()

const path = require('path')
const cors = require('cors')

app.use(cors())

// Set view engine
app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')

// static files
app.use(express.static('./application/public'));

app.get('/', (req, res, next) => {
    res.render('index')
})

module.exports = app