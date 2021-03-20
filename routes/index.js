import { Router } from 'express';
import productsRouter from './products.js';
import ordersRouter from './orders.js';
import lineItemsRouter from './line-items.js';
import customersRouter from './customers.js';

var router = Router();

router.use('/skus', productsRouter);
router.use('/orders', ordersRouter);
router.use('/line_items', lineItemsRouter);
router.use('/customers', customersRouter);

export default router;