import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';
import Order from '../Models/Order.js';
import OrderItem from '../Models/OrderItem.js';

// POST /api/register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      status: 400,
      errors: {
        name: !name ? 'Name is required' : undefined,
        email: !email ? 'Email is required' : undefined,
        password: !password ? 'Password is required' : undefined,
      },
    });
  }

  try {
    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        status: 400,
        message: 'Email already exists',
      });
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Generate token (optional since no auth middleware is used)
    const token = jwt.sign({ id: user._id }, 'myapptoken');

    res.status(201).json({
      status: 201,
      message: 'User created successfully',
      token,
      userID: user._id,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      error: err.message,
    });
  }
};

// POST /api/login
export const authenticate = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      errors: {
        email: !email ? 'Email is required' : undefined,
        password: !password ? 'Password is required' : undefined,
      },
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid email or password',
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign({ id: user._id }, 'myapptoken');

    res.status(200).json({
      status: 200,
      message: 'Welcome our happy customer',
      token,
      userID: user._id,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Login failed',
      error: err.message,
    });
  }
};

// GET /api/getOrderDetails/:id?user_id=xxx
export const getOrderDetails = async (req, res) => {
  const orderId = req.params.id;
  const userId = req.query.user_id;

  if (!userId) {
    return res.status(400).json({
      status: '400',
      message: 'Missing user_id',
    });
  }

  try {
    const order = await Order.findOne({
      _id: orderId,
      user_id: userId
    });

    if (!order) {
      return res.status(404).json({
        status: '404',
        message: 'Order not found',
      });
    }

    const orderItems = await OrderItem.find({ order_id: order._id });

    return res.status(200).json({
      status: '200',
      data: {
        ...order.toObject(),
        order_items: orderItems
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: '500',
      message: 'Error retrieving order',
      error: err.message,
    });
  }

};
