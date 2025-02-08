const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

// Create an order
router.post('/', createOrder);

// Get all orders
router.get('/', getAllOrders);

// Get a single order by ID
router.get('/:id', getOrderById);

// Update an order by ID
router.put('/:id', updateOrder);

// Delete an order by ID
router.delete('/:id', deleteOrder);

module.exports = router;
