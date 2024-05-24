import { body, validationResult } from 'express-validator';

const validatePostUnreactRequest = [
  body('post_id')
    .notEmpty()
    .withMessage('Post ID is required')
    .isNumeric()
    .withMessage('Invalid Post ID format'),

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

export default validatePostUnreactRequest;
