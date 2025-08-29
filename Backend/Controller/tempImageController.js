import TempImage from '../Models/TempImage.js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const store = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 400, message: 'No image uploaded' });
    }

    const imageName = req.file.filename;

    // Create thumbnail using Sharp (already handled)
    const thumbnailPath = `public/uploads/temp/thumb/${imageName}`;
    await sharp(req.file.path)
      .resize(1200, 720, {
        fit: sharp.fit.cover,
      })
      .toFile(thumbnailPath);

    const tempImage = new TempImage({ name: imageName });
    await tempImage.save();

    // Construct URL to access the image
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const image_url = `${baseUrl}/uploads/temp/${imageName}`;
    const thumbnailUrl = `${baseUrl}/uploads/temp/thumb/${imageName}`;

    return res.status(200).json({
      status: 200,
      message: 'Image uploaded successfully',
      data: {
        id: tempImage._id,
        name: imageName,
       image_url,
        thumbnailUrl,
      },
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return res.status(500).json({ status: 500, message: 'Server Error' });
  }
};

const destroy = async (req, res) => {
    try {
        const tempImage = await TempImage.findById(req.params.id);
        if (!tempImage) {
            return res.status(404).json({ status: '404', message: 'Image not found' });
        }

        const filePath = path.join('public/uploads/temp/', tempImage.name);
        const thumbPath = path.join('public/uploads/temp/thumb/', tempImage.name);

        fs.unlinkSync(filePath);
        // fs.unlinkSync(thumbPath); // uncomment if thumb should also be deleted

        await tempImage.deleteOne();

        return res.status(200).json({
            status: '200',
            message: 'Image deleted successfully',
            data: tempImage
        });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Server Error' });
    }
};

export default {
    store,
    destroy
};
