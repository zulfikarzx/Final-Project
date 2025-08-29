import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String } // You can change to Boolean or Enum if needed
}, { timestamps: true });

const Brand = mongoose.model('Brand', BrandSchema);

export default Brand;
