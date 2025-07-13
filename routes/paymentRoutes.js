const express = require('express');
const router = express.Router();
const { createCheckoutSession, stripeWebhook } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');
const bodyParser = require('body-parser');

// Use protect for creating checkout session
router.post('/create-checkout-session', protect, createCheckoutSession);

// Stripe webhook needs raw body so disable json parsing middleware for it
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;