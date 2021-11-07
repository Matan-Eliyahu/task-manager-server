const Sequelize = require("sequelize")
const sequelize = require("./database")

const Task = sequelize.define("task", {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    priority: {
        type: Sequelize.INTEGER
    },
    checked: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

module.exports = Task