// a Cart belongsTo a single User
// a Cart hasMany Products
// 'carts' table will hold different carts for different users

const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Cart = sequelize.define('cart', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : true,
        primaryKey : true,
        unique : true
    }
}, {
    tableName : 'carts'
});

module.exports = Cart;