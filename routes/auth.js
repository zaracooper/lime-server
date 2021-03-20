import { Router } from 'express';

import { AccessToken, GrantTypes } from '../helpers/token.js';
import { makeAuthRequest } from '../helpers/request.js';

var router = Router();

router.post('/token', (req, res, next) => {
    function getNewToken() {
        makeAuthRequest('post', '/oauth/token', GrantTypes.ClientCredentials, req, res);
    }

    if (req.session.accessToken) {
        let token = new AccessToken(req.session.accessToken);
        if (token.isValid()) {
            res.send({ message: 'Issued access token is still valid' }).status(304);
        } else {
            req.session.accessToken = null;
            getNewToken();
        }
    } else {
        getNewToken();
    }
});

export default router;