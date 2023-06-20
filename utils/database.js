const { Sequelize } = require('sequelize'); // capital S (since we're gonna import a Constructor Function)

const sequelize = new Sequelize('node-complete', 'root', '', { 
  dialect : 'mysql', 
  host : 'localhost',
  port : 3307
}); // this will setup a 'connection pool' (Actually, more than that)

// It's a fully configured sequelize environment (connection pool + all features of sequelize package)

module.exports = sequelize;