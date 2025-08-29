import mongoose from 'mongoose';

const productImageSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  image: { type: String, required: true },
});

// Virtual field
productImageSchema.virtual('image_url').get(function () {
  if (!this.image) return '';
  return `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/products/small/${this.image}`;
});

// Include virtuals in JSON and object outputs
productImageSchema.set('toJSON', { virtuals: true });
productImageSchema.set('toObject', { virtuals: true });

const ProductImage = mongoose.model('ProductImage', productImageSchema);
export default ProductImage;
