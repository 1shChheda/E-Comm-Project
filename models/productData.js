const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

// SYNTAX to create a Model: 
    // sequelize.define(modelName, attributes, options)

    // After a model is defined, it is available within `sequelize.models` by its model name
    // example:
        // `sequelize.models.User`

const Product = sequelize.define('product', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        unique : true,
        autoIncrement : true,
        allowNull : false,
    },
    title : {
        type : Sequelize.STRING,
        allowNull : false
    },
    price : {
        type : Sequelize.DOUBLE,
        allowNull : false
    },
    description : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    imageUrl : {
        type : Sequelize.STRING,
        allowNull : false
    }
}, {
    tableName : 'products',
});

module.exports = Product;