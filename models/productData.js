const Cart = require('./cartData');

const db = require('../utils/database'); 

class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;           
            // so we simply pass `null` here for a brand new product, & the id gets assigned to the brand new product when it's getting "SAVED" [via `save()`]
            // but when we're editing a product, we do have an ID, which we can utilize here
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

// Deleting all the ` Working With File System ` Code
// Also we'll NOT USE CALLBACKS now, & we'll work with Promises

    save() {
        return db.execute(
            'INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)', 
            [this.title, this.price, this.description, this.imageUrl]
        );
        // to safely INSERT VALUES and not face the issue of "SQL injection",
        // we should use an approach where we just use question marks, one for each of the fields we insert data into separated with commas,
        // and then there is a SECOND ARGUMENT we pass to execute with the values that will be injected instead of these question marks
        // This is an Extra Security Layer
    }

    static delete(productId) {
        return db.execute(
            'DELETE FROM products WHERE products.id = ?',
            [productId]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
        // We return the entire Promise that `execute` returns, so we can use it somewhere else
    }

    static findProductById(productId) {
        return db.execute(
            'SELECT * FROM products WHERE products.id = ?', 
            [productId]
        );
    }
}

module.exports = Product;