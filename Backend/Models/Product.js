import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  is_featured: { type: Boolean, default: false },
  // sku: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  compare_price: { type: Number },
  description: { type: String },
  short_description: { type: String },
  brand_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  quantity: { type: Number },
  barcode: { type: String },
  image: { type: String },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual: image_url (like Laravel's getImageUrlAttribute)
productSchema.virtual('image_url').get(function () {
  if (!this.image) return '';
  return `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/products/small/${this.image}`;
});

// Virtual: product_images (like hasMany)
productSchema.virtual('product_images', {
  ref: 'ProductImage',
  localField: '_id',
  foreignField: 'product_id'
});

// Virtual: product_sizes (like hasMany)
productSchema.virtual('product_sizes', {
  ref: 'ProductSize',
  localField: '_id',
  foreignField: 'product_id'
});

const Product = mongoose.model('Product', productSchema);
export default Product;
