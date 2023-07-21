// routes for what the Users see
const express = require('express');

const routeProtect = require('../middlewares/routeProtect');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getHomePage);

router.get('/products', shopController.getProducts);

// DYNAMIC PARAMETERS

// router.get('/products/delete');

router.get('/products/:productId', shopController.getSeparateProduct);

// Important Note for DYNAMIC PARAMETERS

    // if you're exploring a specific route, (like '/products' in this case) you'll keep the more specific routes (like '/products/delete') ABOVE the Dynamic routes (like '/products/:productId')

    // Why so?
        // Suppose if you were to reverse the order of the route declarations like this:

        // 1) router.get('/products/:productId');
        // 2) router.get('/products/delete');

        // In this case, when you receive a GET request to `/products/delete`, the first route `router.get('/products/:productId')` would match the URL because it has a dynamic parameter `:productId` which can match any value, including "delete". As a result, the request would be handled by the wrong route, leading to unexpected behavior.

router.post('/cart', routeProtect, shopController.postCart);

router.get('/cart', routeProtect, shopController.getCart);

router.post('/cart/increment', routeProtect, shopController.incrementCartItem);

router.post('/cart/decrement', routeProtect, shopController.decrementCartItem);

router.post('/cart-delete-item', routeProtect, shopController.postCartDeleteProduct);

router.get('/orders', routeProtect, shopController.getOrders);

router.post('/create-order', routeProtect, shopController.postOrder);

router.get('/checkout', routeProtect, shopController.getCheckOut);

module.exports = router;