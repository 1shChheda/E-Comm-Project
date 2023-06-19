const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const OrderItem = sequelize.define('orderItem', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : true,
        primaryKey : true,
        unique : true
    },
    quantity : Sequelize.INTEGER
}, {
    tableName : 'orderItems'
});

module.exports = OrderItem;