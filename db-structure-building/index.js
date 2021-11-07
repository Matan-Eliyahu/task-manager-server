const sequelize = require("./database")

const Task = require("./Task")

sequelize
.sync()
.then((result) => {
    console.log(result)
})
.catch((err) => {
    console.log(err)
})