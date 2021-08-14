module.exports = function(app) {
    const {v4: uuidv4} = require('uuid')
    const db = require('C:/Users/Matan/task-manager-server/db.js')

    const supportedFields = ['title', 'priority']
    const lastUpdatedTime = 'lastUpdatedTime'
    const createTime = 'createTime'
    const id = 'id'

    app.get('/api/tasks/:id', async function(req, res) {
        try {
            var data = await db.readData()
        }
        catch (e) {
            console.log('Reading data error: ', e)
            res.status(404).json({"errorMessage":"Sorry something went wrong"})
        }
        
        var jsonObjFile = JSON.parse(data)
    
        var taskId = req.params.id

        if (taskId in jsonObjFile) {
            res.send(jsonObjFile[taskId])
        } else {
            console.log('ID isn\'t exist')
            res.status(404).json({"errorMessage":"ID isn't exist"})
        }
    })
    
    app.get('/api/tasks', async function(req, res) {
        try {
            var data = await db.readData()
        }
        catch (e) {
            console.log('Reading data error: ', e)
            res.status(404).json({"errorMessage":"Sorry something went wrong"})
        }
        
        var jsonObjFile = JSON.parse(data)
    
        var tasksArray = []
        Object.values(jsonObjFile).map(task => tasksArray.push(task))
        
        res.send(tasksArray)
    })
    
    app.post('/api/task', async function(req, res) {
        try {
            var data = await db.readData()
        }
        catch (e) {
            console.log('Reading data error: ', e)
            res.status(404).json({"errorMessage":"Sorry something went wrong"})
        }

        var jsonObjFile = JSON.parse(data)
        
        var jsonObjTask = req.body
        Object.keys(jsonObjTask).map(function(field) {
            if(!(supportedFields.includes(field.toLowerCase()))) {
                delete jsonObjTask[field]
            }
        })

        jsonObjTask[createTime] = new Date().toLocaleString()
    
        newTaskId = uuidv4()
        jsonObjTask[id] = newTaskId

        jsonObjFile[newTaskId] = jsonObjTask

        try {
            await db.writeData(JSON.stringify(jsonObjFile))
            console.log('Task created')
            res.send(JSON.stringify(newTaskId))
        }
        catch (e) {
            console.log('Writing data error: ', e)
            res.status(404).json({"errorMessage":"Sorry something went wrong"})
        }
    })
    
    app.put('/api/tasks/:id', async function(req, res) {
        try {
            var data = await db.readData()
        }
        catch (e) {
            console.log('Reading data error: ', e)
            res.status(404).json({"errorMessage":"Sorry something went wrong"})
        }
        
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

            try {
                await db.writeData(JSON.stringify(jsonObjFile))
                console.log('Task updated')
                res.send(true)
            }
            catch (e) {
                console.log('Writing data error: ', e)
                res.status(404).json({"errorMessage":"Sorry something went wrong"})
            }
        } else {
            console.log('ID isn\'t exist')
            res.status(404).json({"errorMessage":"ID isn't exist"})
        }
    })
    
    app.delete('/api/tasks/:id', async function(req, res) {
        try {
            var data = await db.readData()
        }
        catch (e) {
            console.log('Reading data error: ', e)
            res.status(404).json({"errorMessage":"Sorry something went wrong"})
        }

        var jsonObjFile = JSON.parse(data)
    
        var taskId = req.params.id

        if (taskId in jsonObjFile) {
            delete jsonObjFile[taskId]

            try {
                await db.writeData(JSON.stringify(jsonObjFile))
                console.log('Task deleted')
                res.send(true)
            }
            catch (e) {
                console.log('Writing data error: ', e)
                res.status(404).json({"errorMessage":"Sorry something went wrong"})
            }
        } else {
            console.log('ID isn\'t exist')
            res.status(404).json({"errorMessage":"ID isn't exist"})
        }
    })
}