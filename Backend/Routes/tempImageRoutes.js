import express from 'express';
import tempImageController from '../Controller/tempImageController.js';
import upload from '../middleware/multerConfig.js';

const router = express.Router();

router.post('/temp', upload.single('image'), tempImageController.store);
router.delete('/temp/:id', tempImageController.destroy);

export default router;
