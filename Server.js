const express = require('express')

const app = express()
app.use(express.json())
require('./Routes/tasks-routes.js')(app)

const port = 80

app.get('*', function(req, res) {
  res.status(404).send('Looks like you have lost the path ;)');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})