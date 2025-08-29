import express from 'express';
import {
  register,
  authenticate,
  getOrderDetails,
} from '../Controller/accountController.js';

const router = express.Router();

// router.post('/register', register);
router.post('/login', authenticate);
router.get('/getOderdetails/:id', getOrderDetails);

export default router;
