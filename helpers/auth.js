function checkAccessToken(req, res, next) {
    if (req.session.accessToken) {
        next();
    } else {
        res.status(401).send({ message: 'Authentication required to acess this route.' });
    }
}

function checkCustomerToken(req, res, next) { }

export { checkAccessToken, checkCustomerToken };