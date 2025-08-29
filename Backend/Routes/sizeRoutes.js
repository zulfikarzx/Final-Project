import express from 'express';
import sizeController from '../Controller/sizeController.js';

const router = express.Router();

router.get('/sizes', sizeController.index);
router.post('/sizes', sizeController.add);

export default router;
