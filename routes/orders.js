import { Router } from 'express';

import { makeAPIRequestWithBody, makeBodilessAPIRequest } from '../helpers/request.js';

var router = Router();

router.post('/', (req, res, next) => {
    makeAPIRequestWithBody(
        'post',
        '/api/orders',
        params,
        { 'data': { 'type': 'orders' }, ...req.body },
        { 'Content-Type': 'application/vnd.api+json' },
        req,
        res,
        'Failed to make order');
});

router.get('/:id', (req, res, next) => {
    let params = {};

    if (req.query.includeItems == 'true') {
        params = {
            "include": "line_items",
            "fields": {
                "orders": ["number", "skus_count", "formatted_subtotal_amount", "formatted_discount_amount", "formatted_shipping_amount", "formatted_total_tax_amount", "formatted_gift_card_amount", "formatted_total_amount_with_taxes", "line_items"],
                "line_items": ["item_type", "image_url", "name", "sku_code", "formatted_unit_amount", "quantity", "formatted_total_amount"]
            }
        };
    }

    makeBodilessAPIRequest(
        'get',
        `/api/orders/${req.params.id}`,
        params,
        req,
        res,
        'Failed to get order');
});

router.get('/:id/line_items', (req, res, next) => {
    let params = {};

    if (req.query.forCart == 'true') {
        params = {
            "fields": {
                "line_items": ["item_type", "image_url", "name", "sku_code", "formatted_unit_amount", "quantity", "formatted_total_amount"]
            }
        };
    }

    makeBodilessAPIRequest(
        'get',
        `/api/orders/${req.params.id}/line_items`,
        params,
        req,
        res,
        'Failed to get line items for order');
});

export default router;