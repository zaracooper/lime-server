import { Router } from 'express';
import axios from 'axios';

import { commerceLayer } from '../config/index.js';

var router = Router();

router.get('/', (req, res, next) => {
    axios({
        method: 'get',
        baseURL: commerceLayer.domain,
        url: '/api/skus',
        headers: {
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${req.session.accessToken.access_token}`
        }
    }).then((response) => {
        res.status(200).send(response.data.data);
    }).catch((err) => {
        if (err.response) {
            res.status(err.response.status).send({ error: err.response.data.errors, message: 'Failed to get products' });
        } else {
            res.status(500).send({ error: err.message, message: 'Failed to get get products' });
        }
    });
});

router.get('/:id', (req, res, next) => {
    axios({
        method: 'get',
        baseURL: commerceLayer.domain,
        url: `/api/skus/${req.params.id}`,
        headers: {
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${req.session.accessToken.access_token}`
        }
    }).then((response) => {
        res.status(200).send(response.data.data);
    }).catch((err) => {
        if (err.response) {
            res.status(err.response.status).send({ error: err.response.data.errors, message: 'Failed to get product' });
        } else {
            res.status(500).send({ error: err.message, message: 'Failed to get get product' });
        }
    });
});

export default router;