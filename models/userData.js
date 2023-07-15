const mongodb = require('mongodb');
const db = require('../utils/database');

class User {
    constructor(id, username, email, cart) {
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.username = username;
        this.email = email;
        this.cart = cart; // { items: [], totalPrice: $ }
    }

    save() {
        const database = db.getDb();

        return database.collection('users').insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err))
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cartItem => {
            return cartItem.productId.toString() === product._id.toString();
        });

        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) { // basically if a product doesn't exist in the Cart, "cartProduct" will be = -1
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity
        } else {
            updatedCartItems.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: newQuantity
            });
        }

        const updatedCart = {
            items: updatedCartItems
        };

        const database = db.getDb();

        return database.collection('users').updateOne(
            { _id: this._id },
            { $set: { cart: updatedCart } }
        );
    }

    removeFromCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cartItem => {
            return cartItem.productId.toString() === product._id.toString();
        });

        const updatedCartItems = [...this.cart.items];
        let newQuantity;

        if (cartProductIndex >=0) {
            newQuantity = this.cart.items[cartProductIndex].quantity - 1;
            if (newQuantity <= 0) {
                return this.deleteItemFromCart(product._id);
            } else {
                updatedCartItems[cartProductIndex].quantity = newQuantity;
            }
        }

        const updatedCart = {
            items: updatedCartItems
        };

        const database = db.getDb();

        return database.collection('users').updateOne(
            { _id: this._id },
            { $set: { cart: updatedCart } }
        );
    }

    deleteItemFromCart(productId) {
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        });

        const updatedCart = {
            items: updatedCartItems
        };

        const database = db.getDb();

        return database.collection('users').updateOne(
            { _id: this._id },
            { $set: { cart: updatedCart } }
        );
    }

    getCart() {
        const database = db.getDb();
        const productIdsArray = this.cart.items.map(individualItem => {
            return individualItem.productId;
        });
        return database.collection('products').find({ _id: { $in: productIdsArray } }).toArray()
            .then(products => {
                return products.map(prod => {
                    return {
                        ...prod, quantity: this.cart.items.find(individualItem => {
                            return individualItem.productId.toString() === prod._id.toString()
                        }).quantity
                    };
                });
            })
            .catch(err => console.log(err))
    }

    addOrder() {
        // we want to add the entire cart into the Order, & also clear the cart from the User
        const database = db.getDb();

        return this.getCart()
            .then(products => {
                const order = {
                    items: products,
                    user: {
                        _id: new mongodb.ObjectId(this._id),
                        name: this.username
                    }
                };

                return database.collection('orders').insertOne(order);
            })
            .then(result => {
                this.cart = { items: [] };
                return database.collection('users').updateOne(
                    { _id: this._id },
                    { $set: { cart: { items: [] } } }
                );
            })
            .catch(err => console.log(err))
    }

    getOrders() {
        const database = db.getDb();
        return database.collection('orders').find({ 'user._id': new mongodb.ObjectId(this._id)  }).toArray() // in MongoDB, we can check NESTED PROPERTIES by defining the path to them, inside "QUOTATION marks"
    }

    static findById(userId) {
        const database = db.getDb();

        return database.collection('users').find({ _id: new mongodb.ObjectId(userId) }).toArray()
            .then(users => {
                console.log(users);
                return users[0]
            })
            .catch(err => console.log(err))
    }
}

module.exports = User;