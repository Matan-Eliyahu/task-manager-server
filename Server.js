const express = require('express')
const fs = require('fs')
const db = require('./db.js')

const app = express()
app.use(express.json())

var new_task_id = 0
const port = 80

require('./Routs/tasksRouts.js')(app, db)

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})