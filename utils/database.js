const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient; // allows to make Connections to MongoDB

let _db;

const mongoConnect = callback => {
  
  MongoClient.connect(process.env.DB_URI) // 'MongoClient.connect` returns a Promise
      .then(client => { 
            // 'Client' object gives us access to the Database
        console.log("Connnected To MongoDB!");

        _db = client.db(); // storing the database instance for future use

        // _db = client.db('shop'); 
            // mentioning the name of a different database in ".db()" will overwrite the databse name mentioned in URI & gives you access to "shop" database

        // NOTE : 
          // Unlike SQL, We don't need a pre-made database in Mongo (i.e. we don't need to create that database before time)
          // The database will be created on its own when we first access it

        callback();
      })
      .catch(err => {
        console.log(err);
        throw err;
      });

};

const getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'No Database Found!'
}

module.exports = {
  mongoConnect : mongoConnect,
  getDb : getDb
}

// mongoConnect --> used for connecting & then storing the Connection to the DB (thus "mongoConnect" will keep on RUNNING)
// getDb --> used whenever you need to interact with the database in your application (if it exists)
    // By calling getDb(), you can retrieve the database instance and perform various operations such as inserting, updating, querying, and deleting data