import express from 'express';
import { saveOrder, getOrders } from '../Controller/OderController.js';

const router = express.Router();

router.post('/saveOrder', saveOrder);
router.get('/orders', getOrders);
// router.get('/getOderdetails/:id', getOrderDetails);

export default router;
