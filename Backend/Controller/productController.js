import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import Product from '../Models/Product.js';
import ProductImage from '../Models/ProductImage.js';
import ProductSize from '../Models/ProductSize.js';
import TempImage from '../Models/TempImage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to delete image files
const deleteImageFiles = (imageName) => {
  const largePath = path.join(__dirname, '../uploads/products/large/', imageName);
  const smallPath = path.join(__dirname, '../uploads/products/small/', imageName);
  if (fs.existsSync(largePath)) fs.unlinkSync(largePath);
  if (fs.existsSync(smallPath)) fs.unlinkSync(smallPath);
};

export default {
  async index(req, res) {
    try {
      const products = await Product.find()
        .sort({ createdAt: -1 })
        .populate('product_images')
        .populate('product_sizes');
      res.status(200).json({ status: 200, products });
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Server Error', error });
    }
  },

  async store(req, res) {
    try {
      const {
        title,
        price,
        status,
      
        category_id,
        is_featured,
        compare_price,
        description,
        short_description,
        brand_id,
        quantity,
        barcode,
        size,
        gallary,
      } = req.body;

      if (!title || !price || !status || !category_id) {
        return res.status(400).json({ status: 400, message: 'Missing required fields' });
      }

      // const existingProduct = await Product.findOne({ });
      // if (existingProduct) {
      //   return res.status(400).json({ status: 400, message:  must be unique' });
      // }

      const product = new Product({
        title, price, status, category_id, is_featured,
        compare_price, description, short_description,
        brand_id, quantity, barcode
      });
      await product.save();

      if (size?.length) {
        const sizes = size.map(sizeId => ({ product_id: product._id, size_id: sizeId }));
        await ProductSize.insertMany(sizes);
      }

      if (gallary?.length) {
        for (let i = 0; i < gallary.length; i++) {
          const tempImage = await TempImage.findById(gallary[i]);
          if (!tempImage) continue;

          const ext = path.extname(tempImage.name);
          const imageName = `${product._id}-${Date.now()}${ext}`;
          const tempPath = path.join(__dirname, '../public/uploads/temp/', tempImage.name);
          const largePath = path.join(__dirname, '../public/uploads/products/large/', imageName);
          const smallPath = path.join(__dirname, '../public/uploads/products/small/', imageName);

          await sharp(tempPath).resize({ width: 1200 }).toFile(largePath);
          await sharp(tempPath).resize(400, 460).toFile(smallPath);

          const productImage = new ProductImage({ product_id: product._id, image: imageName });
          await productImage.save();

          if (i === 0) {
            product.image = imageName;
            await product.save();
          }
        }
      }

      res.status(200).json({ status: 200, message: 'Product created successfully', product });
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Server Error', error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        title, price, status, category_id,
        is_featured, compare_price, description,
        short_description, brand_id, quantity,
        barcode, size, gallary
      } = req.body;

      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ status: 404, message: 'Product not found' });

      Object.assign(product, {
        title, price, status, category_id,
        is_featured, compare_price, description,
        short_description, brand_id, quantity, barcode
      });
      await product.save();

      await ProductSize.deleteMany({ product_id: product._id });
      if (size?.length) {
        const sizes = size.map(sizeId => ({ product_id: product._id, size_id: sizeId }));
        await ProductSize.insertMany(sizes);
      }

      if (gallary?.length) {
        for (let i = 0; i < gallary.length; i++) {
          const tempImage = await TempImage.findById(gallary[i]);
          if (!tempImage) continue;

          const ext = path.extname(tempImage.name);
          const imageName = `${product._id}-${Date.now()}${ext}`;
          const tempPath = path.join(__dirname, '../uploads/temp/', tempImage.name);
          const largePath = path.join(__dirname, '../uploads/products/large/', imageName);
          const smallPath = path.join(__dirname, '../uploads/products/small/', imageName);

          await sharp(tempPath).resize({ width: 1200 }).toFile(largePath);
          await sharp(tempPath).resize(400, 460).toFile(smallPath);

          const productImage = new ProductImage({ product_id: product._id, image: imageName });
          await productImage.save();

          if (i === 0) {
            if (product.image) deleteImageFiles(product.image);
            product.image = imageName;
            await product.save();
          }
        }
      }

      res.status(200).json({ status: 200, message: 'Product updated successfully', product });
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Server Error', error });
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id)
        .populate('product_images')
        .populate('product_sizes');
      if (!product) return res.status(404).json({ status: 404, message: 'Product not found' });

      if (product.product_images?.length) {
        for (const img of product.product_images) {
          deleteImageFiles(img.image);
          await ProductImage.findByIdAndDelete(img._id);
        }
      }

      if (product.product_sizes?.length) {
        for (const size of product.product_sizes) {
          await ProductSize.findByIdAndDelete(size._id);
        }
      }

      await Product.findByIdAndDelete(id);
      res.status(200).json({ status: 200, message: 'Product deleted successfully', product });
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Server Error', error });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id)
        .populate('product_images')
        .populate('product_sizes');
      if (!product) return res.status(404).json({ status: 404, message: 'Product not found' });

      const product_sizes = product.product_sizes.map(s => s.size_id);
      res.status(200).json({ status: 200, product, product_sizes });
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Server Error', error });
    }
  },

  async saveProductImage(req, res) {
    try {
      const { product_id } = req.body;
      if (!req.file) return res.status(400).json({ status: 400, message: 'No image uploaded' });

      const ext = path.extname(req.file.originalname);
      const imageName = `${product_id}-${Date.now()}${ext}`;
      const largePath = path.join(__dirname, '../uploads/products/large/', imageName);
      const smallPath = path.join(__dirname, '../uploads/products/small/', imageName);

      await sharp(req.file.buffer).resize({ width: 1200 }).toFile(largePath);
      await sharp(req.file.buffer).resize(400, 460).toFile(smallPath);

      const productImage = new ProductImage({ product_id, image: imageName });
      await productImage.save();

      res.status(200).json({ status: 200, message: 'Image uploaded successfully', data: productImage });
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Server Error', error });
    }
  },

  async productDefaultImage(req, res) {
    try {
      const { product_id, image } = req.body;
      const product = await Product.findById(product_id);
      if (!product) return res.status(404).json({ status: 404, message: 'Product not found' });

      product.image = image;
      await product.save();

      res.status(200).json({ status: 200, message: 'Default image set successfully', data: product });
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Server Error', error });
    }
  },

  async deleteProductImage(req, res) {
    try {
      const { image_id } = req.params;
      const image = await ProductImage.findById(image_id);
      if (!image) return res.status(404).json({ status: 404, message: 'Image not found' });

      deleteImageFiles(image.image);
      await ProductImage.findByIdAndDelete(image_id);

      res.status(200).json({ status: 200, message: 'Product image deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Server Error', error });
    }
  }
};
