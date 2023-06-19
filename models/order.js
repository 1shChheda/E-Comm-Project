const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Order = sequelize.define('order', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : true,
        primaryKey : true,
        unique : true
    }
}, {
    tableName : 'orders'
});

module.exports = Order