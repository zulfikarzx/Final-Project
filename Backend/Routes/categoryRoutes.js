import express from 'express';
import categoryController from '../Controller/categoryController.js';

const router = express.Router();

router.get('/categories', categoryController.index);
router.post('/categories', categoryController.store);
router.get('/categories/:id', categoryController.show);
router.put('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.destroy);

export default router;
