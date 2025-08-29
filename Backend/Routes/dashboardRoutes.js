import express from 'express';
import dashboardController from '../Controller/dashboardController.js';

const router = express.Router();

router.get('/dashboard/stats', dashboardController.getDashboardStats);

export default router;
