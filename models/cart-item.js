const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const CartItem = sequelize.define('cartItem', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : true,
        primaryKey : true,
        unique : true
    },
    quantity : Sequelize.INTEGER
}, {
    tableName : 'cartItems'
});

module.exports = CartItem;