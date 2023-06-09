// Code to connect to the SQL database & give us back a CONNECTION OBJECT, which allows us to run Queries

const mysql = require('mysql2');

// Two Ways to connect to our SQL Database

    // 1) we set up one connection which we can then use to run queries and we should always close the connection once we're done with a query

        // Using createConnection
        // const connection = mysql.createConnection({
        //     host: 'localhost',
        //     user: 'root',
        //     password: 'password',
        //     database: 'mydatabase'
        // });
        
        // connection.connect((err) => {
        //     if (err) {
        //     console.error('Error connecting to database:', err);
        //     return;
        //     }
        //     console.log('Connected to database!');
        //     // Perform database operations here
        //     connection.end(); // Close the connection when done
        // });

        // Drawback: 
            // we need to re-execute the code to create the connection for every new query
            // & NOTE, there will be A LOT OF QUERIES
        // ( Thus this method is inefficient )

    // 2) we create a so-called "connection pool"
        // it's a "collection of reusable connections"
        // The pool helps manage and reuse connections, improving performance and scalability

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '********',
    database : 'node-complete'
});

module.exports = pool.promise(); // this will allow us to use `promises` when working with these connections (which handle asynchronous tasks, asynchronous data instead of callbacks)
