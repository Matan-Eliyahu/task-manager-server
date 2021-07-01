const http = require('http')
const port = 80

const fs = require('fs')
var data = fs.readFileSync("DataFile.txt", "utf8")

const server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/html"})
  response.write("<h1>data</h1>")
  response.end()
})

server.listen(port)