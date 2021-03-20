import { Router } from 'express';

import { makeBodilessAPIRequest } from '../helpers/request.js';

var router = Router();

router.get('/', (req, res, next) => {
    makeBodilessAPIRequest('get', '/api/skus', req, res, 'Failed to get products');
});

router.get('/:id', (req, res, next) => {
    makeBodilessAPIRequest('get', `/api/skus/${req.params.id}`, req, res, 'Failed to get product');
});

export default router;