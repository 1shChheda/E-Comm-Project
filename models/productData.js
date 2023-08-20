const mongodb = require('mongodb');
const db = require('../utils/database'); // to gain access to DB & also INTERACT with it

class Product {
    constructor(id, title, price, description, imageUrl, userId){
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.userId = userId;
    }

    save() {
        const database = db.getDb();

        let dbOps;
        if (this._id) {
            // Update the Product
            dbOps = database.collection('products').updateOne({_id : this._id}, {$set: this})

        } else {
            // Insert a New Product
            dbOps = database.collection('products').insertOne(this)
        }
        // To interact/create/work with a particular Collection
        return dbOps
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err))
    }

    static fetchAll() {
        const database = db.getDb();

        return database.collection('products').find().toArray()
            .then(products => {
                return products;
            })
            .catch(err => console.log(err))

    }

    static find(filter) {
        const database = db.getDb();

        return database.collection('products').find(filter).toArray()
            .then(products => {
                return products;
            })
            .catch(err => console.log(err))
            
    }

    static findById(productId) {
        const database = db.getDb();

        // return database.collection('products').f ind({ _id : productId })
            // Note: '_id' is an Object provided by MongoDB, & above, we're technically comparing an Object (_id) with a String (productId)

        return database.collection('products').find({ _id : new mongodb.ObjectId(productId) })
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => console.log(err)) 
    }

    static deleteById(productId) {
        const database = db.getDb();

        return database.collection('products').deleteOne({ _id : new mongodb.ObjectId(productId) })
            .then(product => {
                console.log("Deleted Product!");
            })
            .catch(err => console.log(err))
    }
}

module.exports = Product;