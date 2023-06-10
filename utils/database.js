const { Sequelize } = require('sequelize'); // capital S (since we're gonna import a Constructor Function)

const sequelize = new Sequelize('node-complete', 'root', 'chheda1shvenom', { 
    dialect : 'mysql', 
    host : 'localhost' 
}); // this will setup a 'connection pool' (Actually, more than that)

// It's a fully configured sequelize environment (connection pool + all features of sequelize package)

module.exports = sequelize;