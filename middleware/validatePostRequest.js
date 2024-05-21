import { body, validationResult } from 'express-validator';

const validatePostRequest = [
  body('experience')
    .notEmpty()
    .withMessage('Experience is required')
    .isString()
    .withMessage('Invalid experience format'),
  body('daerah_driver')
    .notEmpty()
    .withMessage('Driver location is required')
    .isString()
    .withMessage('Invalid driver location format'),
  body('platform')
    .notEmpty()
    .withMessage('Platform name is required')
    .isString()
    .withMessage('Invalid platform name format'),
  body('service')
    .notEmpty()
    .withMessage('Service type is required')
    .isString()
    .withMessage('Invalid service type format'),
  body('nopol')
    .notEmpty()
    .withMessage('Plate number is required')
    .isString()
    .withMessage('Invalid plate number format'),

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

export default validatePostRequest;
