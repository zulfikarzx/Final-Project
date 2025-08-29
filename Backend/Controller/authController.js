import User from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const JWT_SECRET = 'your_jwt_secret_key'; // Store this in .env in production

const authenticate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            errors: errors.mapped()
        });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 400, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: 400, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

        if (user.role === 'admin') {
            return res.status(200).json({
                status: 200,
                message: 'welcome admin',
                token,
                userID: user._id,
                name: user.name
            });
        }

        if (user.role === 'customer') {
            return res.status(201).json({
                status: 201,
                message: 'Welcome our happy customer',
                token,
                userID: user._id,
                name: user.name
            });
        }

    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            errors: errors.mapped()
        });
    }

    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 400, message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'customer'  // fallback default
        });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            status: 201,
            message: 'User created successfully',
            token,
            userID: user._id,
            name: user.name,
            role: user.role
        });

    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};


export default {
    authenticate,
    register
};
