import express from 'express';
import AdminorderController from '../Controller/AdminorderController.js';

const router = express.Router();

// GET /api/orders - Get all orders
router.get('/Allorders', AdminorderController.index);

// GET /api/orders/:id - Get order by ID with items
router.get('/Allorders/:id', AdminorderController.show);

// PUT /api/orders/:id - Update order status/payment_status
router.put('/uporders/:id', AdminorderController.update);

export default router;
