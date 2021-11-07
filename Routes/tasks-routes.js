module.exports = function(app) {
    const {v4: uuidv4} = require('uuid')
    const db = require('C:/Users/Matan/task-manager-server/db.js')

    const supportedFields = ['text', 'priority', 'checked']
    const id = 'id'

    app.get('/api/tasks/:id', async function(req, res) {
        try {
            var taskId = req.params.id
            var data = await db.readData(taskId)

            if (data.length != 0) {
                res.send(data)
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
            res.send(await db.readData())
        }
        catch (e) {
            console.log(e)
            res.status(404).json({"errorMessage":"Sorry something went wrong"})
        }
    })
    
    app.post('/api/task', async function(req, res) {
        try {
            var jsonObjTask = req.body
            var recivedId = jsonObjTask.id

            Object.keys(jsonObjTask).map(function(field) {
                if(!(supportedFields.includes(field.toLowerCase()) && field.toLowerCase() !== 'id')) {
                    delete jsonObjTask[field]
                }
            })

            if (recivedId === undefined) {
                newTaskId = uuidv4()
                jsonObjTask[id] = newTaskId
            }
            else {
                jsonObjTask[id] = recivedId
            }

            await db.writeData(jsonObjTask)
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
            var taskId = req.params.id

            var jsonObjFields = req.body

            Object.keys(jsonObjFields).map(function(field) {
                if(!supportedFields.includes(field.toLowerCase())) {
                    delete jsonObjFields[field]
                }
            })

            var result = await db.updateData(taskId, jsonObjFields)

            if (result[0]) {
                res.send(true)
                console.log('Task updated')
            }
            else {
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
            var taskId = req.params.id
            var result = await db.deleteData(taskId)

            if (result[0]) {
                res.send(true)
                console.log('Task deleted')
            }
            else {
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