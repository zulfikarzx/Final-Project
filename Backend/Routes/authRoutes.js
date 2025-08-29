import express from 'express';
import authController from '../Controller/authController.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/login', [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required')
], authController.authenticate);

router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required')
], authController.register);

export default router;
