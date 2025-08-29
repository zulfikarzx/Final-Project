import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String } // Can also be Boolean or Enum
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

export default Category;
