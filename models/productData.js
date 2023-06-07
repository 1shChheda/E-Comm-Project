const fs = require('fs');

const path = require('path');

const rootDir = require('../utils/path');

const Cart = require('./cartData');
// const product = [];

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

    save() {

        if (this.id) {
            const products = Product.fetchAll();
            const existingProductIndex = products.findIndex(prod => prod.id === this.id);
            const updatedProducts = [ ...products ];
            updatedProducts[existingProductIndex] = this;

            const fileLocation = path.join(rootDir, 'data', 'products.json');
            
            fs.writeFile(fileLocation, JSON.stringify(updatedProducts), err => {
                console.log(err);
            });
                // Imagine that We create a new product instance, populate it with all the info & then check 
                    // If its an existing product, `save()` will replace the old info with "this" new info, 
                    // else a new product itself will be created

        } else {
            this.id = Math.random().toString();

            // products.push(this); // only `this` will refer to the object created based on the class and that's te object I want to store in this array
    
            const folderLocation = path.join(rootDir, 'data');
            const fileLocation = path.join(rootDir, 'data', 'products.json');
    
            // To make a folder, if not existing already 
            if (!fs.existsSync(folderLocation)) {
                fs.mkdirSync(folderLocation);
            }
              
            // If file doesn't exist, we write into a newly made file
            if (!fs.existsSync(fileLocation)) {
                fs.writeFileSync(fileLocation, JSON.stringify([this]));
    
            } 
            // & now if the file exists, 
                // we read the file --> parse its contents --> push in new content --> write into the file
            else {
                const fileContent = fs.readFileSync(fileLocation);
                const products = JSON.parse(fileContent);
                products.push(this);
                fs.writeFile(fileLocation, JSON.stringify(products));
            }
        }
    }

    static delete(productId) {
        const products = Product.fetchAll();
        
        const product = products.find(prod => prod.id === productId);
        
        const updatedProducts = products.filter(prod => prod.id !== productId);

        const fileLocation = path.join(rootDir, 'data', 'products.json');


        fs.writeFile(fileLocation, JSON.stringify(updatedProducts), err => {
            console.log(err);
            if(!err) {
                Cart.deleteProduct(productId, Number(product.price));
            }
        });
    }

    static fetchAll() {
        // this is not called on a single instance of the product (since it fetches all products)
        // `static` keyword helps you call `fetchAll` method DIRECTLY ON THE CLASS ITSELF (& not on any single instance of product)

        // return products;

        const fileLocation = path.join(rootDir, 'data', 'products.json');
        
        // If file doesn't exist, return an empty array (indicating NO Products)
        if (!fs.existsSync(fileLocation)) {
            return [];
        }
            
        const fileContent = fs.readFileSync(fileLocation);
        return JSON.parse(fileContent);
    }

    static findProductById(productId, callback) {
        
        const products = Product.fetchAll();

        const product = products.find(prod => prod.id === productId);

        callback(product);
    }
}

module.exports = Product;