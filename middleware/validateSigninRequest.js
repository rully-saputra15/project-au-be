const { body, validationResult } = require('express-validator');

const validateSigninRequest = [
    body('oauth_token').notEmpty().withMessage('Token is required'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors.array(),
            });
        }

        return next();
    },
];

module.exports = validateSigninRequest;
