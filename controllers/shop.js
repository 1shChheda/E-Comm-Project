const Product = require('../models/productData');

const Cart = require('../models/cartData');
const { Sequelize } = require('sequelize');

const getHomePage = (req, res, next) => {

    console.log("in the homepage");

    Product.findAll()
        .then(products => {

            res.render('shop/homepage', {
                pageTitle : "HomePage",
                path : "/",
                prods : products, 
                hasProducts : products.length > 0
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

    Product.findAll()
        .then(products => {

            res.render('shop/product-list', {
                pageTitle : "All Products",
                path :"/products",
                prods : products,
                hasProducts : products.length > 0
            });
            
        })
        .catch(err => console.log(err));
};

const getSeparateProduct = (req, res, next) => {

    const productId = req.params.productId;
    Product.findByPk(productId)
        .then(product => {

            // console.log(rows);
            res.render('shop/product-detail', {
                pageTitle : `${product.title} - Details`,
                path : `/products`,
                product : product
            });

        })
        .catch(err => console.log(err));

};

const getCart = (req, res, next) => {

    console.log("in the cart");

    req.user.getCart()
        .then(cart => {

            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        pageTitle : "My Cart",
                        path : '/cart',
                        products : products,
                        // totalPrice : cart.totalPrice
                    });
                })
                .catch(err => console.log(err));

        })
        .catch(err => console.log(err));

    // Cart.getCart(cart => {
    //     const allProducts = Product.fetchAll();
    //     const cartProducts = [];
    //     for (product of allProducts) {

    //         const cartProductData = cart.products.find(prod => prod.id === product.id);

    //         if (cart.products.find(prod => prod.id === product.id)) {
    //             cartProducts.push({
    //                 productData : product, 
    //                 qty : cartProductData.qty
    //             });
    //         }
    //     }
        // res.render('shop/cart', {
        //     pageTitle : "My Cart",
        //     path : '/cart',
        //     products : cartProducts,
        //     totalPrice : cart.totalPrice
        // });
    // });
};

const postCart = (req, res, next) => {
    const productId = req.body.productId; // came using the `hidden input area`, with `value= "productId"`

    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where : {id : productId} });
        })
        .then(products => {
            let product;

            if(products.length > 0) {
                product = products[0]
            }

            if(product) {
                const oldQuantity = product.cartItem.quantity;

                newQuantity = oldQuantity + 1;
                
                return product;
            }

            return Product.findByPk(productId)

        })
        .then(product => {
            return fetchedCart.addProduct(product, { through : { quantity : newQuantity } });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

const postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    req.user.getCart()
        .then(cart => {
            return cart.getProducts({ where: { id : productId } });
        })
        .then(products => {
            const product = products [0];
            return product.cartItem.destroy();
        })
        .then(result => {
            console.log("Product Removed from the Cart!");
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
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
    postCartDeleteProduct : postCartDeleteProduct,
    getOrders : getOrders,
    getCheckOut : getCheckOut
}