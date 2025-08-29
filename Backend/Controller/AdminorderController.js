import Order from '../Models/Order.js';
import OrderItem from '../Models/OrderItem.js';

const index = async (req, res) => {
   try {
    const orders = await Order.find().sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({
        status: '404',
        message: 'Orders not found',
      });
    }

    res.status(200).json({
      status: '200',
      orders,
    });
  } catch (err) {
    res.status(500).json({
      status: '500',
      message: 'Server error',
      error: err.message,
    });
  }
};

const show = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        status: '404',
        message: 'Order not found',
      });
    }

    const orderItems = await OrderItem.find({ order_id: order._id }).populate('product_id');
    
    res.status(200).json({
      status: '200',
      order: {
        ...order.toObject(),
        order_items: orderItems,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: '500',
      message: 'Server error',
      error: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        status: '404',
        message: 'Order not found',
      });
    }

    order.status = req.body.status;
    order.payment_status = req.body.payment_status;
    await order.save();

    res.status(200).json({
      status: '200',
      message: 'Order updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: '500',
      message: 'Server error',
      error: err.message,
    });
  }
};

export default {
  index,
  show,
  update,
};
