const { Sequelize } = require('sequelize'); // capital S (since we're gonna import a Constructor Function)

const sequelize = new Sequelize('node-complete', 'root', 'password', { 
    dialect : 'mysql', 
    host : 'localhost' 
}); // this will setup a 'connection pool' (Actually, more than that)

module.exports = pool.promise(); // this will allow us to use `promises` when working with these connections (which handle asynchronous tasks, asynchronous data instead of callbacks)
