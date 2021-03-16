import { Router } from 'express';
import axios from 'axios';

import AccessToken from '../helpers/access_token.js';
import { commerceLayer } from '../config/index.js';

var router = Router();

router.get('/token', (req, res, next) => {
    function getNewToken() {
        axios({
            method: 'post',
            baseURL: commerceLayer.domain,
            url: `/oauth/token`,
            data: {
                'grant_type': 'client_credentials',
                'client_id': commerceLayer.clientId,
                'scope': commerceLayer.euScope
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            req.session.accessToken = { ...response.data, last_saved: Date.now() };
            res.status(200).send({ message: 'Token successfully acquired' });
        }).catch((err) => {
            res.status(500).send({ error: err, message: 'Failed to get access token' });
        });
    }

    if (req.session.accessToken) {
        let token = new AccessToken(req.session.accessToken);
        if (token.isValid()) {
            res.status(304).send({ message: 'Issued access token is still valid' });
        } else {
            req.session.accessToken = null;
            getNewToken();
        }
    } else {
        getNewToken();
    }
});

export default router;