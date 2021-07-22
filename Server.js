const express = require('express')
const fs = require('fs')

const app = express()
const port = 80

var new_task_id = 0

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

function GetFullTime(){
  var date_obj = new Date()
  var day = date_obj.getDate()
  var month = date_obj.getMonth() + 1
  var year = date_obj.getFullYear()
  var time = date_obj.getHours() + ":" + date_obj.getMinutes() + ":" + date_obj.getSeconds()

  return day + "-" + month + "-" + year + ", " + time
}

app.get('/api/tasks/:id', function(req, res){
  var data = fs.readFileSync("TasksFile.JSON")
  var JSON_obj_file = JSON.parse(data)

  var task_id = req.params.id

  res.send(JSON_obj_file[task_id])
})

app.get('/api/tasks', function(req, res){
  var data = fs.readFileSync("TasksFile.JSON")
  var JSON_obj_file = JSON.parse(data)

  var tasks_Array = []

  for (const task in JSON_obj_file) {
    tasks_Array.push(JSON_obj_file[task])
  }
  
  res.send(tasks_Array)
})

app.get('/api/cars', (req, res) => {
  console.log(req.color)
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

app.use(express.json())

app.post('/api/task', function(req, res){
  var data = fs.readFileSync("TasksFile.JSON")
  var JSON_obj_file = JSON.parse(data)
  
  var JSON_obj_task = req.body

  JSON_obj_task.createTime = GetFullTime()

  //JSON_obj_task.id = new_task_id

  JSON_obj_file[new_task_id] = JSON_obj_task
  new_task_id += 1

  fs.writeFile("TasksFile.JSON", JSON.stringify(JSON_obj_file)+"\n", function(err){
    if(err)
    {
      console.log(err)
      console.log("Failed to write in the file")
    }
    else
    {
      //res.sendStatus(201)
      res.send(JSON.stringify(new_task_id - 1))
      console.log("Created")
      // res.end()
    }
  })
})

app.put('/api/tasks/:id', function(req, res){
  var data = fs.readFileSync("TasksFile.JSON")
  var JSON_obj_file = JSON.parse(data)

  var task_id = req.params.id
  var JSON_obj_fields = req.body

  for(var field in JSON_obj_fields)
  {
    JSON_obj_file[task_id][field] = JSON_obj_fields[field]
  }

  JSON_obj_file[task_id]["lastUpdatedTime"] = GetFullTime()
  
  fs.writeFile("TasksFile.JSON", JSON.stringify(JSON_obj_file)+"\n", function(err){
    if(err)
    {
      console.log(err)
      console.log("Failed to write in the file")
      res.send(false)
    }
    else
    {
      //res.sendStatus(200)
      console.log("Updated")
      res.send(true)
    }
    // res.end()
  })
})

app.delete('/api/tasks/:id', function(req, res){
  var data = fs.readFileSync("TasksFile.JSON")
  var JSON_obj_file = JSON.parse(data)

  var task_id = req.params.id
  
  delete JSON_obj_file[task_id]
  
  fs.writeFile("TasksFile.JSON", JSON.stringify(JSON_obj_file)+"\n", function(err){
    if(err)
    {
      console.log(err)
      console.log("Failed to write in the file")
      res.send(false)
    }
    else
    {
      //res.sendStatus(301)
      console.log("Deleted")
      res.send(true)
    }
    // res.end()
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})