import { Router } from 'express';
import productsRouter from './products.js';

var router = Router();

router.use('/skus', productsRouter);

export default router;