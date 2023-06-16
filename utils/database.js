const { Sequelize } = require('sequelize'); // capital S (since we're gonna import a Constructor Function)

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      port : process.env.DB_PORT
    }
  ); // this will setup a 'connection pool' (Actually, more than that)

// It's a fully configured sequelize environment (connection pool + all features of sequelize package)

module.exports = sequelize;