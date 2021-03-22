import { Router } from 'express';

import { makeAPIRequestWithBody, makeBodilessAPIRequest } from '../helpers/request.js';

var router = Router();

router.post('/', (req, res, next) => {
    let data = {
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
                }
            }
        },
    };

    if (req.body.skuId) {
        data['data']['relationships']['item'] = { 'data': { 'type': 'skus', 'id': req.body.skuId } };
    } else if (req.body.skuCode) {
        data['data']['attributes']['sku_code'] = req.body.skuCode;
    } else {
        res.status(500).send({ message: 'Missing SKU ID or code.' });
        return;
    }

    makeAPIRequestWithBody(
        'post',
        '/api/line_items',
        {},
        data,
        { 'Content-Type': 'application/vnd.api+json' },
        req,
        res,
        'Failed to add item to cart');
});

router.get('/:id', (req, res, next) => {
    makeBodilessAPIRequest(
        'get',
        `/api/line_items/${req.params.id}`,
        {},
        req,
        res,
        'Failed to get line item');
});

router.patch('/:id', (req, res, next) => {
    makeAPIRequestWithBody(
        'patch',
        `/api/line_items/${req.params.id}`,
        {},
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

router.delete('/:id', (req, res, next) => {
    makeBodilessAPIRequest(
        'delete',
        `/api/line_items/${req.params.id}`,
        {},
        req,
        res,
        'Failed to delete line item');
});

export default router;