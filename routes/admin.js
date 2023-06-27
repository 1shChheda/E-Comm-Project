// Route that handles the Creation of Products (which the Admin of the Shop can do)

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();
    // helps you group related routes together and organize your code better
    // like a mini version of the main `app` object that allows you to define routes and their corresponding handlers

// NOTE : `router` functions work in the exact same way as the `app` function worked


router.get('/add-product', adminController.getAddProduct); // I've SPLIT THE CODE into `MVC`

// router.use('/cart', (req, res, next) => {
//     console.log(req.body); // needs to be parsed separately (else it'll give `undefined`)
//     res.redirect('/'); // much more convenient than conventional code used earlier
// });

// `router.get()`& `router.post()` are same as `router.use()` , but IT ONLY FIRES FOR AN INCOMING GET REQUEST & POST REQUEST respectively

router.post('/add-product', adminController.postAddProduct); // I've SPLIT THE CODE into `MVC`

// IMPORTANT NOTE : 
    // same path can be used, If the METHODS differ
        // as seen above for '/admin/add-product'
    // in such a setup, where our paths, in a router file, start with the same part or same segment,...
        // we can take that segment & mention it in the app.js file...{check it out}

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.get('/products', adminController.getProducts);

// router.post('/delete-product',adminController.postDeleteProduct);

module.exports = router // the `router` will have the above 2 routes registered within it