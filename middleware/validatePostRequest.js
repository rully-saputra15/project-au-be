import { body, validationResult } from 'express-validator';

const validetPostRequest = [
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isString()
    .withMessage('Invalid content format'),
  // Nanti slugnya dihandle di be aja kan ya ini?
  body('location')
    .notEmpty()
    .withMessage('Location is required')
    .isString()
    .withMessage('Invalid location format'),
  body('vendor_name')
    .notEmpty()
    .withMessage('Vendor name is required')
    .isString()
    .withMessage('Invalid vendor name format'),
  body('service_type')
    .notEmpty()
    .withMessage('Service type is required')
    .isString()
    .withMessage('Invalid service type format'),
  body('plate_number')
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

export default validetPostRequest;
