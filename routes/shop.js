// routes for what the Users see
const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getHomePage);

router.get('/products', shopController.getProducts);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckOut);

module.exports = router;