// routes for what the Users see
const express = require('express');

const router = express.Router();

const path = require('path');

const rootDir = require('../utils/path');

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    
    if (req.url === '/favicon.ico') {
        // Skip further processing for favicon request
        return res.sendStatus(204);
    }

    // '/' does not mean the full path (after the domain) has to be a `/`, but it has to start with this

    console.log("in the home/shop page");
    // res.send(`<h1>Hello World! from NodeJS</h1>`); 

    // res.sendFile('/views/shop.html'); // GIVES AN ERROR!
        // But Why?
            // this method requires an `absolute path` to the file you want to send
            // `/views/shop.html`, is a relative path and does not represent the absolute path to the file

    // const filePath = path.join(rootDir, 'views', 'shop.html');

    // res.sendFile(filePath);  

    res.render('shop',{ 
        pageTitle : "Shop",
        path : "/",
        prods : adminData.products, 
        hasProducts : adminData.products.length > 0
    }); // this allows us to `render` a dynamic template page, & also allows us to pass in data that should be added to the template
});

module.exports = router;