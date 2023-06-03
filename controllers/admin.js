const Product = require('../models/productData');

const products = Product.fetchAll();

const getAddProduct = (req, res, next) => {
    console.log("in the admin/add-products page");

    // const filePath= path.join(rootDir, 'views', 'add-product.html');
    
    // res.sendFile(filePath); 

    res.render('admin/add-product', {
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

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    
    const product = new Product(title, imageUrl, description, price);
    product.save();
    
    res.redirect('/'); // much more convenient than conventional code used earlier
};

const getProducts = (req, res, next) => {

    console.log("in the admin/products page");
    
    const products = Product.fetchAll();

    res.render('admin/products',{ 
        pageTitle : "Admin Products",
        path : "/admin/products",
        prods : products, 
        hasProducts : products.length > 0
    });
};

module.exports = {
    getAddProduct : getAddProduct,
    postAddProduct : postAddProduct,
    getProducts : getProducts
}