// models/ProductSize.js
import mongoose from 'mongoose';

const productSizeSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  size_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: true },
});

const ProductSize = mongoose.model('ProductSize', productSizeSchema);
export default ProductSize;
