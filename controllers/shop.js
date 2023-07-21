const Models = require('../utils/all_Models');

const getHomePage = (req, res, next) => {

    console.log("in the homepage");

    Models.Product.fetchAll()
        .then(products => {

            res.render('shop/homepage', {
                pageTitle: "HomePage",
                path: "/",
                prods: products,
                hasProducts: products.length > 0
            });

        })
        .catch(err => console.log(err));

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

    Models.Product.fetchAll()
        .then(products => {

            res.render('shop/product-list', {
                pageTitle: "All Products",
                path: "/products",
                prods: products,
                hasProducts: products.length > 0
            });

        })
        .catch(err => console.log(err));
};

const getSeparateProduct = (req, res, next) => {

    const productId = req.params.productId;
    Models.Product.findById(productId)
        .then(product => {
            res.render('shop/product-detail', {
                pageTitle: `${product.title} - Details`,
                path: `/products`,
                product: product
            });

        })
        .catch(err => console.log(err));

};

const getCart = (req, res, next) => {

    console.log("in the cart");

    req.user.getCart()
        .then(products => {
            res.render('shop/cart', {
                pageTitle: "My Cart",
                path: '/cart',
                products: products
            });
        })
        .catch(err => console.log(err));
};

const postCart = (req, res, next) => {
    const productId = req.body.productId; // came using the `hidden input area`, with `value= "productId"`

    Models.Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
};

const incrementCartItem = async (req, res, next) => {
    const productId = req.body.productId;
    
    Models.Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
}

const decrementCartItem = async (req, res, next) => {
    const productId = req.body.productId;

    Models.Product.findById(productId)
        .then(product => {
            return req.user.removeFromCart(product)
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
}

const postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    req.user.deleteItemFromCart(productId)
        .then(result => {
            console.log("Product Removed from the Cart!");
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

const getCheckOut = (req, res, next) => {

    console.log("in the checkout");

    res.render('shop/checkout', {
        pageTitle: "CheckOut!",
        path: '/checkout'
    });
};

const postOrder = (req, res, next) => {
    req.user.addOrder()
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};

const getOrders = (req, res, next) => {

    console.log("in the order-page");
    
    req.user.getOrders()
        .then(orders => {

            res.render('shop/orders', {
                pageTitle: "My Orders",
                path: "/orders",
                orders: orders
            });

        })
        .catch(err => console.log(err))

};

module.exports = {
    getHomePage: getHomePage,
    getProducts: getProducts,
    getSeparateProduct: getSeparateProduct,
    getCart: getCart,
    postCart: postCart,
    incrementCartItem: incrementCartItem,
    decrementCartItem: decrementCartItem,
    postCartDeleteProduct: postCartDeleteProduct,
    getOrders: getOrders,
    postOrder: postOrder,
    getCheckOut: getCheckOut
}