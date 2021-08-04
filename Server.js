const express = require('express')
const db = require('./db.js')

const app = express()
app.use(express.json())
require('./Routs/tasksRouts.js')(app, db)

const port = 80

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})