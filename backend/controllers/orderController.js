const Order = require('../models/Order');
const { StatusCodes } = require('http-status-codes');

const createOrder = async (req, res) => {
  try {
    const { products, user, totalPrice } = req.body;

    const order = await Order.create({
      products,
      user,
      totalPrice,
      status: 'Pending', 
    });

    res.status(StatusCodes.CREATED).json({ order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(StatusCodes.OK).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Order not found' });
    }

    res.status(StatusCodes.OK).json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(StatusCodes.OK).json({ order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
