const express = require('express');
const router = express.Router();

const { createOrder, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

// Protect all routes
router.use(protect);

// POST create new order (purchase)
router.post('/', createOrder);

// GET logged-in user’s orders
router.get('/myorders', getMyOrders);

module.exports = router;
