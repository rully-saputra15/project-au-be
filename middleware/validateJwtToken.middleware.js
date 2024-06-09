const jwt = require('jsonwebtoken');
const { jsonFailed } = require('../helpers/messageFormat.helpers');

const validateJwtToken = (req, res, next) => {
    try {
        const headers = req.headers.authorization || req.headers.Authorization;

        if (!headers?.startsWith('Bearer ')) {
            const myError = new Error();
            myError.statusCode = 401;
            myError.message = 'You are not logged in';
            throw myError;
        }

        const jwtToken = headers.split(' ')[1];

        jwt.verify(jwtToken, process.env.SECRET, (err, decoded) => {
            if (err) throw err;

            req.user = decoded.userId;
        });

        next();
    } catch (error) {
        jsonFailed(res, error);
    }
};

module.exports = validateJwtToken;
