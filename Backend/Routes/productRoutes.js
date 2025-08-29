import express from 'express';
import { body } from 'express-validator';
import productController from '../Controller/productController.js';
import upload from '../middleware/multerConfig.js';

const router = express.Router();

// Validation rules
const productValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('status').notEmpty().withMessage('Status is required'),
  body('sku').notEmpty().withMessage('SKU is required'),
  body('category_id').notEmpty().withMessage('Category ID is required'),
];

// Routes
router.get('/products', productController.index);
router.post('/products', productValidationRules, productController.store);
router.get('/products/:id', productController.show);
router.put('/products/:id', productValidationRules, productController.update);
router.delete('/products/:id', productController.destroy);
router.post('/saveproductimage', upload.single('image'), productController.saveProductImage);
router.post('/setproductdefaultimage', productController.productDefaultImage);
router.delete('/deleteproductimage/:id', productController.deleteProductImage);

export default router;
