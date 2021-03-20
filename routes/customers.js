import { Router } from 'express';

import { makeAPIRequestWithBody, makeBodilessAPIRequest } from '../helpers/request.js';

var router = Router();

router.post('/', (req, res, next) => {
    makeAPIRequestWithBody(
        'post',
        '/api/customers',
        {
            'data': {
                'type': 'customers',
                'attributes': {
                    'email': req.body.email,
                    'password': req.body.password,
                    'metadata': {
                        'first_name': req.body.firstName,
                        'last_name': req.body.lastName
                    },
                }
            }
        },
        { 'Content-Type': 'application/vnd.api+json' },
        req,
        res,
        'Failed to create customer');
});

router.get('/:id', (req, res, next) => {
    makeBodilessAPIRequest(
        'get',
        `/api/customers/${req.params.id}`,
        req,
        res,
        'Failed to get customer');
});

router.delete('/:id', (req, res, next) => {
    makeBodilessAPIRequest(
        'delete',
        `/api/customers/${req.params.id}`,
        req,
        res,
        'Failed to delete customer');
});

export default router;