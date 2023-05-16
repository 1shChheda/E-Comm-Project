// Route that handles the Creation of Products (which the Admin of the Shop can do)

const express = require('express');

const router = express.Router();
    // helps you group related routes together and organize your code better
    // like a mini version of the main `app` object that allows you to define routes and their corresponding handlers

// NOTE : `router` functions work in the exact same way as the `app` function worked

router.get('/add-product', (req, res, next) => {
    console.log("in the products page");
    res.send(`
        <h1>Products Page</h1>
        <form action="/product" method="POST">
            <input type="text" name="product"autocomplete="off">
            <button type="submit">Add Product</button>
        </form>
    `); 
    // next(); // No Need. Will Result in an Error
});

// router.use('/cart', (req, res, next) => {
//     console.log(req.body); // needs to be parsed separately (else it'll give `undefined`)
//     res.redirect('/'); // much more convenient than conventional code used earlier
// });

// `router.get()`& `router.post()` are same as `router.use()` , but IT ONLY FIRES FOR AN INCOMING GET REQUEST & POST REQUEST respectively

router.post('/product', (req, res, next) => {
    console.log(req.body); // needs to be parsed separately (else it'll give `undefined`)
    res.redirect('/'); // much more convenient than conventional code used earlier
});

module.exports = router; // the `router` will have the above 2 routes registered within it 