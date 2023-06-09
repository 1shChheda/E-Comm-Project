const Product = require('../models/productData');

const getAddProduct = (req, res, next) => {
    console.log("in the admin/add-products page");

    // const filePath= path.join(rootDir, 'views', 'add-product.html');
    
    // res.sendFile(filePath); 

    res.render('admin/edit-product', {
        pageTitle : "Add Product",
        path : '/admin/add-product',
        editing : false
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
    
    const product = new Product(null, title, imageUrl, description, price); // `null` id added. Since if a new Product, id will be assigned in 
    product.save()
        .then(() => {
            res.redirect('/'); // much more convenient than conventional code used earlier
        })
        .catch(err => console.log(err));
    
};

// QUERY PARAMETERS
    // They are appended to the URL as key-value pairs and are used to modify the behavior of a request or provide additional information
    // They are preceded by a question mark (?) and separated by an ampersand (&) if multiple parameters are present
    // For example, in the URL "/products?category=electronics&sort=price", 
        // --> "category" and "sort" are query parameters, 
        // --> and their values can be used to filter or sort the products returned by the server

// Note: You don't need to add any information about query params to ROUTES FILE (not affected)
// But you can always CHECK FOR Query Params in CONTROLLER FILES
const getEditProduct = (req, res, next) => {
    // we grab the particular query (with `key` name as `edit` here)
    const editMode = req.query.edit;

    if(!editMode) {
        return res.redirect('/');
    }

    const productId = req.params.productId;

    Product.findProductById(productId, product => {
        
        if(!product) {
            res.status(404).render('404-error', {
                pageTitle: "Page Not Found",
                path: req.path 
            });
        }

        res.render('admin/edit-product', {
            pageTitle : "Edit Product",
            path : '/admin/edit-product',
            editing : editMode,
            product : product
        });
    });
};

const postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;
    const updatedProduct = new Product(productId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    updatedProduct.save();
    res.redirect('/admin/products');
};

const postDeleteProduct = (req, res, next) => {

    const productId = req.body.productId;

    Product.delete(productId)
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));

};

const getProducts = (req, res, next) => {

    console.log("in the admin/products page");
    
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            
            res.render('admin/products',{ 
                pageTitle : "Admin Products",
                path : "/admin/products",
                prods : rows, 
                hasProducts : rows.length > 0
            });

        })
        .catch(err => console.log(err));
};

module.exports = {
    getAddProduct : getAddProduct,
    postAddProduct : postAddProduct,
    getEditProduct : getEditProduct,
    postEditProduct : postEditProduct,
    postDeleteProduct : postDeleteProduct,
    getProducts : getProducts
}