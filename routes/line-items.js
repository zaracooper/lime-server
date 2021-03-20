import { Router } from 'express';

import { makeAPIRequestWithBody, makeBodilessAPIRequest } from '../helpers/request.js';

var router = Router();

router.post('/', (req, res, next) => {
    makeAPIRequestWithBody(
        'post',
        '/api/line_items',
        {
            'data': {
                'type': 'line_items',
                'attributes': {
                    'quantity': req.body.quantity,
                    '_update_quantity': true,
                    'name': req.body.name,
                    'image_url': req.body.imageUrl
                },
                'relationships': {
                    'order': {
                        'data': { 'type': 'orders', 'id': req.body.orderId }
                    },
                    'item': {
                        'data': { 'type': 'skus', 'id': req.body.skuId }
                    },
                }
            },
        },
        { 'Content-Type': 'application/vnd.api+json' },
        req,
        res,
        'Failed to add item to cart');
});

router.patch('/:id', (req, res, next) => {
    makeAPIRequestWithBody(
        'post',
        `/api/line_items/${req.params.id}`,
        {
            'data': {
                'id': req.params.id,
                'type': 'line_items',
                'attributes': { 'quantity': req.body.quantity }
            },
        },
        { 'Content-Type': 'application/vnd.api+json' },
        req,
        res,
        'Failed to update quantity of item in cart');
});

// { 'Content-Type': 'application/vnd.api+json' }
router.delete('/:id', (req, res, next) => {
    makeBodilessAPIRequest(
        'delete',
        `/api/line_items/${req.params.id}`,
        req,
        res,
        'Failed to delete order');
});

export default router;