import Order from '../Models/Order.js';
import OrderItem from '../Models/OrderItem.js';

// Save new order
export const saveOrder = async (req, res) => {
  const {
    user_id, // required from frontend
    subtotal,
    grand_total,
    shipping,
    discount,
    payment_status,
    status,
    name,
    email,
    mobile,
    address,
    city,
    zip,
    cart
  } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({
      status: '400',
      message: 'Your cart is empty',
    });
  }

  try {
    const order = new Order({
      user_id,
      subtotal,
      grand_total,
      shipping,
      discount,
      payment_status,
      status,
      name,
      email,
      mobile,
      address,
      city,
      zip
    });

    const savedOrder = await order.save();

    const orderItems = cart.map(item => ({
      order_id: savedOrder._id,
      product_id: item.product_id,
      size: item.size,
      name: item.title,
      price: item.quantity * item.price,
      unit_price: item.price,
      quantity: item.quantity,
      image_url: item.image_url
    }));

    await OrderItem.insertMany(orderItems);

    return res.status(200).json({
      id: savedOrder._id,
      status: '200',
      message: 'You successfully placed an order'
    });
  } catch (err) {
    return res.status(500).json({
      status: '500',
      message: 'Something went wrong',
      error: err.message
    });
  }
};

// Get all orders for a user
export const getOrders = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({
      status: '400',
      message: 'Missing user_id in request',
    });
  }

  try {
    const orders = await Order.find({ user_id });
    return res.status(200).json({
      status: '200',
      orders
    });
  } catch (err) {
    return res.status(500).json({
      status: '500',
      message: 'Error fetching orders',
      error: err.message
    });
  }
};

// Get order details by order ID and user ID (both passed manually)
export const getOrderDetails = async (req, res) => {
  const orderId = req.params.id;
  const userId = req.query.user_id;

  if (!userId) {
    return res.status(400).json({ status: '400', message: 'Missing user_id in request' });
  }

  try {
    const order = await Order.findOne({ _id: orderId, user_id: userId })
      .populate('order_items'); // Populate if using references

    if (!order) {
      return res.status(404).json({ status: '400', message: 'Order not found' });
    }

    res.status(200).json({ status: '200', data: order });
  } catch (err) {
    res.status(500).json({
      status: '500',
      message: 'Error retrieving order',
      error: err.message
    });
  }
};
