module.exports = function(app) {
    const {v4: uuidv4} = require('uuid')
    const db = require('C:/Users/Matan/task-manager-server/db.js')

    const supportedFields = ['text', 'priority', 'checked']
    const lastUpdatedTime = 'lastUpdatedTime'
    const createTime = 'createTime'
    const id = 'id'

    app.get('/api/tasks/:id', async function(req, res) {
        try {
            var data = await db.readData()

            var jsonObjFile = JSON.parse(data)
    
            var taskId = req.params.id
    
            if (taskId in jsonObjFile) {
                res.send(jsonObjFile[taskId])
            } else {
                console.log('ID isn\'t exist')
                res.status(404).json({"errorMessage":"ID isn't exist"})
            }
        }
        catch (e) {
            console.log(e)
            res.status(404).json({"errorMessage":"Sorry something went wrong"})
        }
    })
    
    app.get('/api/tasks', async function(req, res) {
        try {
            var data = await db.readData()

            var jsonObjFile = JSON.parse(data)
    
            var tasksArray = []
            Object.values(jsonObjFile).map(task => tasksArray.push(task))
            
            res.send(tasksArray)
        }
        catch (e) {
            console.log(e)
            res.status(404).json({"errorMessage":"Sorry something went wrong"})
        }
    })
    
    app.post('/api/task', async function(req, res) {
        try {
            var data = await db.readData()

            var jsonObjFile = JSON.parse(data)

            var jsonObjTask = req.body
            var recivedId = jsonObjTask.id

            Object.keys(jsonObjTask).map(function(field) {
                if(!(supportedFields.includes(field.toLowerCase()) && field.toLowerCase() !== 'id')) {
                    delete jsonObjTask[field]
                }
            })
    
            jsonObjTask[createTime] = new Date().toLocaleString()

            if (recivedId === undefined) {
                newTaskId = uuidv4()
                jsonObjTask[id] = newTaskId
                jsonObjFile[newTaskId] = jsonObjTask
            }
            else {
                jsonObjTask[id] = recivedId
                jsonObjFile[recivedId] = jsonObjTask
            }

            await db.writeData(JSON.stringify(jsonObjFile))
            res.send(JSON.stringify(jsonObjTask.id))
            console.log('Task created')
        }
        catch (e) {
            console.log(e)
            res.status(404).json({"errorMessage":"Sorry something went wrong"})
        }
    })
    
    app.put('/api/tasks/:id', async function(req, res) {
        try {
            var data = await db.readData()

            var jsonObjFile = JSON.parse(data)
    
            var taskId = req.params.id
    
            if (taskId in jsonObjFile) {
                var jsonObjFields = req.body
    
                Object.keys(jsonObjFields).map(function(field) {
                    if(supportedFields.includes(field.toLowerCase())) {
                        jsonObjFile[taskId][field] = jsonObjFields[field]
                    }
                })
            
                jsonObjFile[taskId][lastUpdatedTime] = new Date().toLocaleString()
    
                await db.writeData(JSON.stringify(jsonObjFile))
                res.send(true)
                console.log('Task updated')
            } else {
                console.log('ID isn\'t exist')
                res.status(404).json({"errorMessage":"ID isn't exist"})
            }
        }
        catch (e) {
            console.log(e)
            res.status(404).json({"errorMessage":"Sorry something went wrong"})
        }
    })
    
    app.delete('/api/tasks/:id', async function(req, res) {
        try {
            var data = await db.readData()

            var jsonObjFile = JSON.parse(data)
    
            var taskId = req.params.id
    
            if (taskId in jsonObjFile) {
                delete jsonObjFile[taskId]
                await db.writeData(JSON.stringify(jsonObjFile))
                res.send(true)
                console.log('Task deleted')
            } else {
                console.log('ID isn\'t exist')
                res.status(404).json({"errorMessage":"ID isn't exist"})
            }
        }
        catch (e) {
            console.log(e)
            res.status(404).json({"errorMessage":"Sorry something went wrong"})
        }
    })
}