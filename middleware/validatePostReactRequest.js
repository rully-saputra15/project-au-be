import { body, validationResult } from 'express-validator';

const validatePostReactRequest = [
    body('post_id')
        .notEmpty()
        .withMessage('Post ID is required')
        .isNumeric()
        .withMessage('Invalid Post ID format'),

    body('reaction')
        .optional()
        .isIn(['Happy', 'Sad', 'Neutral'])
        .withMessage('Invalid reaction'),

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

export default validatePostReactRequest;
