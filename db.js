const db_File_Name = "tasksFile.JSON"
fs = require('fs')

function ReadData(){
    if (fs.existsSync(db_File_Name))
    {
        return fs.readFileSync(db_File_Name)
    }
    else
    {
        initial_data = "{}"
        fs.writeFileSync(db_File_Name, initial_data)
        return initial_data
    }
}

function WriteData(data){
    var succeeded_written_to_file = true

    fs.writeFile(db_File_Name, data, function(err){
        if(err)
        {
            console.log(err)
            console.log("Failed to write in the file")
            succeeded_written_to_file = false
        }
    })

    return succeeded_written_to_file
}

exports.ReadData = ReadData
exports.WriteData = WriteData