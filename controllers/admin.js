const mongodb = require('mongodb'); // NOTE: I've used new mongodb.ObjectId() at places in this file since the "req.session.user._id" property didn't have the same BSON type as it was required while storing, thus needed to convert it to that type first
const Models = require('../utils/all_Models');
const getAddProduct = (req, res, next) => {
    console.log("in the admin/add-products page");

    // const filePath= path.join(rootDir, 'views', 'add-product.html');
    
    // res.sendFile(filePath); 

    res.render('admin/edit-product', {
        pageTitle : "Add Product",
        path : '/admin/add-product',
        editing : false,
        isAuthenticated: req.session.isLoggedIn
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
    
    const product = new Models.Product(null, title, price, description, imageUrl, req.user._id);

    product.save()
        .then(result => {
            console.log("Product Created!");
            res.redirect("/admin/products");
        })
        .catch(err => console.log(err))
    
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

    Models.Product.findById(productId)
        .then(product => {
            if(!product) {
                res.status(404).render('404-error', {
                    pageTitle: "Page Not Found",
                    path: req.path,
                    isAuthenticated: req.session.isLoggedIn
                });
            }
    
            res.render('admin/edit-product', {
                pageTitle : "Edit Product",
                path : '/admin/edit-product',
                editing : editMode,
                product : product,
                isAuthenticated: req.session.isLoggedIn
            });

        })
        .catch(err => console.log(err));

};

const postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;

    const product = new Models.Product(productId, updatedTitle, updatedPrice, updatedDescription, updatedImageUrl, req.user._id)
    // To save these changes in our database, we simply use:
    return product.save()
        .then(result => {
            console.log("Product Updated!");
            res.redirect('/admin/products'); // we shifted it here because we want the updated page to load after the Updation has been performed
        })

        // this `catch` block will catch errors from both `.findByPk()` & `.save()`
        .catch(err => console.log(err));
};

const postDeleteProduct = (req, res, next) => {

    const productId = req.body.productId;

    Models.Product.deleteById(productId)
        .then(results => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));

};

const getProducts = (req, res, next) => {

    console.log("in the admin/products page");
    
    // ONE FILTERS :
        // 1) we want all products which belong only to a particular user
    
    Models.Product.fetchAll()
        .then(products => {
            
            res.render('admin/products',{ 
                pageTitle : "Admin Products",
                path : "/admin/products",
                prods : products, 
                hasProducts : products.length > 0,
                isAuthenticated: req.session.isLoggedIn
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