const Task = require('C:/Users/Matan/task-manager-server/db-structure-building/Task')

async function readData(taskId) {
    if (taskId) {
        return await Task.findAll({
            where: {
                id: taskId
            }
        })
    }

    return await Task.findAll()
}

async function writeData(data) {
    await Task.create(data)
}

async function updateData(taskId, data) {
    return await Task.update(data, {
        where: {
            id: taskId
        }
    })
}

async function deleteData(taskId) {
    return await Task.destroy({
        where: {
            id: taskId
        }
    })
}

exports.readData = readData
exports.writeData = writeData
exports.updateData = updateData
exports.deleteData = deleteData