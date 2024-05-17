import { body, validationResult } from 'express-validator';

const validetPostRequest = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Invalid title format'),
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
  body('ojol_name')
    .notEmpty()
    .withMessage('Ojol name is required')
    .isString()
    .withMessage('Invalid ojol name format'),
  body('vendor_name')
    .notEmpty()
    .withMessage('Vendor name is required')
    .isString()
    .withMessage('Invalid vendor name format'),
  body('service_type')
    .notEmpty()
    .withMessage('Sergvice type is required')
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
