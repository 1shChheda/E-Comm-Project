const Product = require('../models/productData');

const getAddProduct = (req, res, next) => {
    console.log("in the products page");

    // const filePath= path.join(rootDir, 'views', 'add-product.html');
    
    // res.sendFile(filePath); 

    res.render('add-product', {
        pageTitle : "Add Product",
        path : '/admin/add-product'
    });
    // next(); // No Need. Will Result in an Error
};

const postAddProduct = (req, res, next) => {
    // console.log(req.body); // needs to be parsed separately (else it'll give `undefined`)

    // products.push({ title : req.body.title }); // storing data in a variable for now
        // sharing it to shop.js 
        // REMOVED FROM HERE...since I've SPLIT THE CODE into `MVC`

    const product = new Product(req.body.title);
    product.save();
    
    res.redirect('/'); // much more convenient than conventional code used earlier
};

const getProducts = (req, res, next) => {
    
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
    
    const products = Product.fetchAll();

    res.render('shop',{ 
        pageTitle : "Shop",
        path : "/",
        prods : products, 
        hasProducts : products.length > 0
    }); // this allows us to `render` a dynamic template page, & also allows us to pass in data that should be added to the template
};

module.exports = {
    getAddProduct : getAddProduct,
    postAddProduct : postAddProduct,
    getProducts : getProducts
}