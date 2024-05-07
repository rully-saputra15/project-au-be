import { body, validationResult } from 'express-validator';

const validateSigninRequest = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('token')
    .notEmpty()
    .withMessage('Token is required')
    .isAlphanumeric()
    .withMessage('Invalid token format'),

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

export default validateSigninRequest;
