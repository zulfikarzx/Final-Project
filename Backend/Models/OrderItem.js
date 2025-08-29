// models/OrderItem.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  size: String,
  name: String,
  price: Number,
  unit_price: Number,
  quantity: Number,
  image_url: String
});

export default mongoose.model('OrderItem', orderItemSchema);
