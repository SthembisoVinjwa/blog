const http = require('http')
const app = require('./application/frontend')

const server = http.createServer(app)

server.listen(process.env.PORT || 3001)