const fs = require('fs');

const path = require('path');

const rootDir = require('../utils/path');

const fileLocation = path.join(rootDir, 'data', 'cart.json');

class Cart {
    // allows us to create a new cart
        // constructor() { 
        //     this.products = []; // this will have some objects which will have `productId & `quantity` of each Product
        //     this.totalPrice = 0; // initially `0`. should increase/decrease with every product we add/remove
        // }

    // We don't want to make a new Cart Instance every time we add/remove a product
    // Instead, There will always be a cart, & we'll manage the products inside it

    static addProduct(productId, productPrice) {
        // Goal:
            // 1) Fetch the previous cart
            // 2) Analyse the cart => Find existing product
            // 3) Add new Product / increase quantity of the existing product

        // 1)
            fs.readFile(fileLocation, (err, fileContent) => {
                let cart = {
                    products : [], 
                    totalPrice : 0
                };

                // If there is an `err` (ERROR), it means NO PRE-EXISTING CART IS PRESENT, & a new Cart has to be created

                // If there is NO ERROR, it means There exists a Cart already, & you need to analyze it

                if(!err) {
                    cart = JSON.parse(fileContent);
                }
                // After the above `if` statement, we know that we will have a cart & now we can analyze it

                // 2)
                    const existingProductIndex = cart.products.findIndex(prod => prod.id === productId);

                    const existingProduct = cart.products[existingProductIndex];
                    
                    let updatedProduct;
                    
                // 3)
                    if(existingProduct) { // if the product exists already in the cart
                        updatedProduct = { ...existingProduct };
                        updatedProduct.qty += 1;
                        cart.products = [ ...cart.products ];
                        cart.products[existingProductIndex] = updatedProduct;

                    } else { // if a new product is to be added to the cart
                        updatedProduct = { 
                            id : productId,
                            qty : 1,
                            price : productPrice
                        };

                        cart.products = [ ...cart.products, updatedProduct ];
                    }

                    cart.totalPrice = Number(cart.totalPrice);
                    cart.totalPrice += Number(updatedProduct.price);

                    fs.writeFile(fileLocation, JSON.stringify(cart), (err) => {
                        console.log(err);
                    });
            });
    }
}

module.exports = Cart