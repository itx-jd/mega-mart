const express = require('express');
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/orderController');

router.route('/')
  .post(createOrder)
  .get(getAllOrders);

router.route('/:id')
  .get(getOrderById)
  .patch(updateOrderStatus);

module.exports = router;
