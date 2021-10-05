const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors({
  origin:"http://localhost:3000",
}))

require('./Routes/tasks-routes.js')(app)

const port = 80

app.get('*', function(req, res) {
  res.status(404).send('Looks like you have lost the path ;)');
})

app.post('*', function(req, res) {
  res.status(404).send('Looks like you have lost the path ;)');
})

app.put('*', function(req, res) {
  res.status(404).send('Looks like you have lost the path ;)');
})

app.delete('*', function(req, res) {
  res.status(404).send('Looks like you have lost the path ;)');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})