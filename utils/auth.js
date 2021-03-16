export function accessChecker(req, res, next) {
    if (req.session.accessToken) {
        next();
    } else {
        res.status(401).send({ message: 'Authorization required to acess this route.' });
    }
}