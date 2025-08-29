import User from '../Models/User.js';
import Order from '../Models/Order.js';
import Product from '../Models/Product.js';

const getDashboardStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const ordersCount = await Order.countDocuments();
    const productsCount = await Product.countDocuments();

    res.status(200).json({
      status: 200,
      data: {
        users: usersCount,
        orders: ordersCount,
        products: productsCount,
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Error retrieving dashboard stats',
      error: err.message
    });
  }
};

export default {
  getDashboardStats
};
