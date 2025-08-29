import express from 'express';
import {
  showProducts,
  bestProducts,
  getCategories,
  getBrands,
  getProduct,
  getProductDetail,
  DiscountProducts,
} from '../Controller/displayController.js';

const router = express.Router();

router.get('/showproducts', showProducts);
router.get('/bestproducts', bestProducts);
router.get('/getproduct', getProduct);
router.get('/getcategories', getCategories);
router.get('/getbrands', getBrands);
router.get('/getproductdetail/:id', getProductDetail);
router.get('/Discountproduct', DiscountProducts);

export default router;
