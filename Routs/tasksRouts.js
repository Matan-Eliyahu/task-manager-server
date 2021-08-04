module.exports = function(app, db){
    const {v4: uuidv4} = require('uuid')

    function GenerateUUID()
    {
        return uuidv4()
    }

    app.get('/api/tasks/:id', function(req, res){
        var data = db.ReadData()
        var JSON_obj_file = JSON.parse(data)
    
        var task_id = req.params.id

        if (task_id in JSON_obj_file)
        {
            res.send(JSON_obj_file[task_id])
        }
        else
        {
            console.log("ID isn't exist")
            res.status(404).json({"errorMessage":"ID isn't exist"})
        }
    })
    
    app.get('/api/tasks', function(req, res){
        var data = db.ReadData()
        var JSON_obj_file = JSON.parse(data)
    
        var tasks_Array = []
        Object.values(JSON_obj_file).map(task => tasks_Array.push(task))
        
        res.send(tasks_Array)
    })
    
    app.get('*', function(req, res){
        res.status(404).send('Looks like you have lost the path ;)');
    })
    
    app.post('/api/task', function(req, res){
        var data = db.ReadData()
        var JSON_obj_file = JSON.parse(data)
        
        var JSON_obj_task = req.body
    
        JSON_obj_task.createTime = new Date().toLocaleString()
    
        new_task_id = GenerateUUID()
        JSON_obj_task.id = new_task_id

        JSON_obj_file[new_task_id] = JSON_obj_task

        if (db.WriteData(JSON.stringify(JSON_obj_file)))
        {
            console.log("Created")
            res.send(JSON.stringify(new_task_id))
        }
        else
        {
            res.status(404).json({"errorMessage":"Failed to write in the file"})
        }
    })
    
    app.put('/api/tasks/:id', function(req, res){
        var data = db.ReadData()
        var JSON_obj_file = JSON.parse(data)
    
        var task_id = req.params.id

        if (task_id in JSON_obj_file)
        {
            var JSON_obj_fields = req.body
            Object.keys(JSON_obj_fields).map(field => JSON_obj_file[task_id][field] = JSON_obj_fields[field])
        
            JSON_obj_file[task_id]["lastUpdatedTime"] = new Date().toLocaleString()

            if (db.WriteData(JSON.stringify(JSON_obj_file)))
            {
                console.log("Updated")
                res.send(true)
            }
            else
            {
                res.status(404).json({"errorMessage":"Failed to write in the file"})
            }
        }
        else
        {
            console.log("ID isn't exist")
            res.status(404).json({"errorMessage":"ID isn't exist"})
        }
    })
    
    app.delete('/api/tasks/:id', function(req, res){
        var data = db.ReadData()
        var JSON_obj_file = JSON.parse(data)
    
        var task_id = req.params.id

        if (task_id in JSON_obj_file)
        {
            delete JSON_obj_file[task_id]

            if (db.WriteData(JSON.stringify(JSON_obj_file)))
            {
                console.log("Deleted")
                res.send(true)
            }
            else
            {
                res.status(404).json({"errorMessage":"Failed to write in the file"})
            }
        }
        else
        {
            console.log("ID isn't exist")
            res.status(404).json({"errorMessage":"ID isn't exist"})
        }
    })
}