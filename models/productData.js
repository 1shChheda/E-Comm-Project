const db = require('../utils/database'); // to gain access to DB & also INTERACT with it

class Product {
    constructor(title, price, description, imageUrl){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const database = db.getDb();

        // To interact/create/work with a particular Collection
        return database.collection('products').insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err))
    }

    static fetchAll() {
        const database = db.getDb();

        return database.collection('products').find().toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => console.log(err))

    }
}

module.exports = Product;