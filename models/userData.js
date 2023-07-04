const mongodb = require('mongodb');
const db = require('../utils/database');

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    save() {
        const database = db.getDb();

        return database.collection('users').insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err))
    }

    static findById(userId) {
        const database = db.getDb();

        return database.collection('users').find({ _id : new mongodb.ObjectId(userId) }).toArray()
            .then(users => {
                console.log(users);
                return users[0]
            })
            .catch(err => console.log(err))
    }
}

module.exports = User;