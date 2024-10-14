const express = require('express');
const statusRoutes = require('./status/status');
const productRoutes = require('./product/product');
const categoryRoutes = require('./category/category');
const sizeRoutes = require('./size/size');
const orderRoutes = require('./order/order');
const orderDetailRoutes = require('./orderDetail/orderDetail');
const paymentRoutes = require('./payment/payment');

const router = express.Router();

router.use('/status', statusRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/sizes', sizeRoutes);
router.use('/orders', orderRoutes);
router.use('/order-details', orderDetailRoutes);
router.use('/payments', paymentRoutes);

// 

module.exports = router;
