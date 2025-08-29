import mongoose from 'mongoose';

const SizeSchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true });

const Size = mongoose.model('Size', SizeSchema);

export default Size;
