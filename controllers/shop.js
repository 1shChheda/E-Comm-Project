const Product = require('../models/productData');

const Cart = require('../models/cartData');

const products = Product.fetchAll();

const getHomePage = (req, res, next) => {

    console.log("in the homepage");

    res.render('shop/homepage', {
        pageTitle : "HomePage",
        path : "/",
        prods : products, 
        hasProducts : products.length > 0
    });
};

const getProducts = (req, res, next) => {

    // '/' does not mean the full path (after the domain) has to be a `/`, but it has to start with this

    console.log("in the all products page");
    // res.send(`<h1>Hello World! from NodeJS</h1>`); 

    // res.sendFile('/views/shop.html'); // GIVES AN ERROR!
        // But Why?
            // this method requires an `absolute path` to the file you want to send
            // `/views/shop.html`, is a relative path and does not represent the absolute path to the file

    // const filePath = path.join(rootDir, 'views', 'shop.html');

    // res.sendFile(filePath);

    res.render('shop/product-list',{ 
        pageTitle : "All Products",
        path : "/products",
        prods : products, 
        hasProducts : products.length > 0
    }); // this allows us to `render` a dynamic template page, & also allows us to pass in data that should be added to the template
};

const getSeparateProduct = (req, res, next) => {

    const productId = req.params.productId;
    Product.findProductById(productId, product => {
        // console.log(product);
        res.render('shop/product-detail', {
            pageTitle : `${product.title} - Details`,
            path : `/products`,
            product : product
        });
    });
};

const getCart = (req, res, next) => {

    console.log("in the cart");

    res.render('shop/cart', {
        pageTitle : "My Cart",
        path : '/cart'
    });
};

const postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findProductById(productId, product => {
        Cart.addProduct(productId, product.price);
    });
    res.redirect('/cart');
};

const getCheckOut = (req, res, next) => {

    console.log("in the checkout");

    res.render('shop/checkout', {
        pageTitle : "CheckOut!",
        path : '/checkout'
    });
};

const getOrders = (req, res, next) => {

    res.render('shop/orders', {
        pageTitle : "My Orders",
        path : "/orders"
    });
};

module.exports = {
    getHomePage : getHomePage,
    getProducts : getProducts,
    getSeparateProduct : getSeparateProduct,
    getCart : getCart,
    postCart : postCart,
    getOrders : getOrders,
    getCheckOut : getCheckOut
}