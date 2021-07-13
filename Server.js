// const http = require('http')
// const fs = require('fs')
// const url = require('url')

// const port = 80
// // var data = fs.readFileSync("DataFile.JSON", "utf8")

// const server = http.createServer(function (request, response) {
//   fs.readFile("DataFile.JSON", function(err, data){
//     if (err)
//     {
//       console.log("Something went wrong...")
//       console.log(err)
//     }
//     else
//     {
//       if (request.url == "/cars")
//       {
//         // response.writeHead(200, {"Content-Type": "text/html"})
//         response.write(data)
//       }
//       else
//       {
//         response.write("Not a good request")
//       }
      
//       response.end()
//     }
//   })
// })

// server.listen(port)

const express = require('express')
const fs = require('fs')
const app = express()
const port = 80

function IsJSON(data)
{
  try
  {
    JSON.parse(data)
  }
  catch (e)
  {
    console.log(e)
    return false
  }
  return true
}

app.get('/api/cars', (req, res) => {
  fs.readFile("DataFile.json", function(err, data){
    if (err)
    {
      res.write("Something went wrong...")
      console.log(err)
    }
    else
    {
        if (IsJSON(data))
        {
          res.write(data)
        }
        else
        {
          res.write("Sorry, something need to be fixed")
          console.log("Not JSON")
        }
    }
    res.end()
  })
})

app.get('*', function(req, res){
  res.status(404).send('Looks like you have lost the path ;)');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})