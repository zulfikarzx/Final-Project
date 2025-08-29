import express from 'express';
import brandController from '../Controller/brandController.js';

const router = express.Router();

router.get('/brands', brandController.index);
router.post('/brands', brandController.store);
router.get('/brands/:id', brandController.show);
router.put('/brands/:id', brandController.update);
router.delete('/brands/:id', brandController.destroy);

export default router;
