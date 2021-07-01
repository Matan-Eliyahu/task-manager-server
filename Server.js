const http = require('http')
const fs = require('fs')
const url = require('url')

const port = 80
// var data = fs.readFileSync("DataFile.JSON", "utf8")

const server = http.createServer(function (request, response) {
  fs.readFile("DataFile.JSON", function(err, data){
    if (err)
    {
      console.log("Something went wrong...")
      console.log(err)
    }
    else
    {
      if (request.url == "/cars")
      {
        // response.writeHead(200, {"Content-Type": "text/html"})
        response.write(data)
      }
      else
      {
        response.write("Not a good request")
      }
      
      response.end()
    }
  })
})

server.listen(port)