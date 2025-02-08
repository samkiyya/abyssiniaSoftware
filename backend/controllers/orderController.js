// controllers/OrderController.js


const Order = require('../models/order');

const Product = require('../models/product');
const User = require('../models/user');


// Create an order
async function createOrder(req, res) {
  try {
    const { userId, productId, quantity, totalPrice } = req.body;

    // Create the order
    const order = await Order.create({
      userId,
      productId,
      quantity,
      totalPrice,
      status: 'pending',  // Default status can be set here
    });
   
   
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
}

// Get all orders
async function getAllOrders(req, res) {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'fullName'],  // Modify attributes as needed
        },
        {
          model: Product,
          attributes: ['id', 'title', 'price'], // Modify attributes as needed
        },
      ],
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
}

// Get a single order by ID
async function getOrderById(req, res) {
  const { id } = req.params;
  try {
    const order = await Order.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'Fullname'],
        },
        {
          model: Product,
          attributes: ['id', 'title', 'price'],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
}
// Update an order
async function updateOrder(req, res) {
  const { id } = req.params;
  const { userId, productId, quantity, totalPrice, status } = req.body;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order
    order.userId = userId || order.userId;
    order.productId = productId || order.productId;
    order.quantity = quantity || order.quantity;
    order.totalPrice = totalPrice || order.totalPrice;
    order.status = status || order.status;

    await order.save();

    // Fetch updated order with associated User and Product
    const updatedOrder = await Order.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'fullName'],
        },
        {
          model: Product,
          attributes: ['id', 'title', 'price'],
        },
      ],
    });

    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
}

// Delete an order
async function deleteOrder(req, res) {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
