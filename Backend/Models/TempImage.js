import mongoose from 'mongoose';

const TempImageSchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true });

const TempImage = mongoose.model('TempImage', TempImageSchema);

export default TempImage;
