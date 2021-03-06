import { Router } from 'express';

import { GrantTypes, isTokenCurrent } from '../helpers/token.js';
import { makeAuthRequest } from '../helpers/request.js';

var router = Router();

router.post('/token', (req, res, next) => {
    const grantType = req.body.grantType;

    function checkToken(token) {
        if (isTokenCurrent(token)) {
            res.send({ message: 'Issued access token is still valid' }).status(304);
        } else {
            makeAuthRequest(grantType, req, res);
        }
    }

    switch (grantType) {
        case GrantTypes.Password:
            checkToken(req.session.customerToken);
            break;
        case GrantTypes.ClientCredentials:
            checkToken(req.session.clientToken);
            break;
        default:
            makeAuthRequest(grantType, req, res);
    }

});

export default router;