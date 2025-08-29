// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subtotal: Number,
  grand_total: Number,
  shipping: Number,
  discount: Number,
  payment_status: String,
  status: String,
  name: String,
  email: String,
  mobile: String,
  address: String,
  city: String,
  zip: String
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
