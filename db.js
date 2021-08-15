const dbFileName = 'tasksFile.JSON'
fs = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

async function readData() {
    try {
        return await readFileAsync(dbFileName)
    }
    catch (e) {
        if (e.code === 'ENOENT') {
           await writeFileAsync(dbFileName, '{}')
           return '{}'
        }
        else {
            return e
        }
    }
}

async function writeData(data) {
    await writeFileAsync(dbFileName, data)
}

exports.readData = readData
exports.writeData = writeData