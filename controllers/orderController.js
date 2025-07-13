const Order = require('../models/orderModel');

// @desc    Create new order (purchase)
// @route   POST /api/orders
// @access  Private (authenticated users)
const createOrder = async (req, res) => {
  const { courseId, paymentIntentId, amount } = req.body;

  if (!courseId || !paymentIntentId || !amount) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const order = await Order.create({
      user: req.user._id,
      course: courseId,
      paymentIntentId,
      amount,
      status: 'paid',
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get orders (purchase history) of logged-in user
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('course', 'title price')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOrder, getMyOrders };
