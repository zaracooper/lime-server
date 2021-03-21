import { Router } from 'express';

import { isTokenCurrent } from '../helpers/token.js';
import { makeAuthRequest } from '../helpers/request.js';

var router = Router();

router.post('/token', (req, res, next) => {
    if (isTokenCurrent(req.session.customerToken) | isTokenCurrent(req.session.clientToken)) {
        res.send({ message: 'Issued access token is still valid' }).status(304);
    } else {
        makeAuthRequest('post', '/oauth/token', req.body.grantType, req, res);
    }
});

export default router;