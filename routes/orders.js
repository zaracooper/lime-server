import { Router } from 'express';

import { makeAPIRequestWithBody, makeBodilessAPIRequest } from '../helpers/request.js';

var router = Router();

router.post('/', (req, res, next) => {
    makeAPIRequestWithBody(
        'post',
        '/api/orders',
        { 'data': { 'type': 'orders' }, ...req.body },
        { 'Content-Type': 'application/vnd.api+json' },
        req,
        res,
        'Failed to make order');
});

router.get('/', (req, res, next) => {
    makeBodilessAPIRequest(
        'get',
        `/api/orders`,
        req,
        res,
        'Failed to get orders');
});

router.get('/:id', (req, res, next) => {
    makeBodilessAPIRequest(
        'get',
        `/api/orders/${req.params.id}`,
        req,
        res,
        'Failed to get order');
});

export default router;