const stripe = require('../utils/stripe');
const Order = require('../models/orderModel');

// @desc Create Stripe Checkout Session
// @route POST /api/payments/create-checkout-session
// @access Private

const createCheckoutSession = async (req, res) => {
  const { courseId, price, success_url, cancel_url } = req.body;

  try {
    if (!courseId || !price || !success_url || !cancel_url) {
      return res.status(400).json({ message: 'Missing required info' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Course Purchase: ${courseId}`,
            },
            unit_amount: price * 100,
          },
        },
      ],
      success_url,
      cancel_url,
      metadata: {
        courseId,
        userId: req.user._id.toString(),
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Stripe checkout session creation failed' });
  }
};

// @desc Stripe Webhook Handler
// @route POST /api/payments/webhook
// @access Public (Stripe calls this)

const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Fulfill order: create Order in DB
    try {
      const order = await Order.create({
        user: session.metadata.userId,
        course: session.metadata.courseId,
        paymentIntentId: session.payment_intent,
        amount: session.amount_total / 100,
        status: 'paid',
      });
      console.log('Order created', order._id);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  }

  res.json({ received: true });
};

module.exports = { createCheckoutSession, stripeWebhook };
