const { body, validationResult } = require('express-validator');

const validateCommentRequest = [
    body('post_id').isNumeric().withMessage('Invalid Post ID format'),
    body('parent_id')
        .notEmpty()
        .withMessage('Parent ID is required')
        .isNumeric()
        .withMessage('Invalid Parent ID format'),
    body('content')
        .notEmpty()
        .withMessage('Content is required')
        .isString()
        .withMessage('Invalid content format'),

    (req, res, next) => {
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

module.exports = validateCommentRequest;
