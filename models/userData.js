const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('user', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        unique : true,
        autoIncrement : true,
        allowNull : false,
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            isEmail : true
        }
    }
}, {
    tableName : 'users'
});

module.exports = User;