const Sequelize = require("sequelize");

const sequelize = new Sequelize("task-manager", "root", "MySqlPassword", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;