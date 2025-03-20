const { body, param, validationResult } = require('express-validator');

const validateObjectId = () => {
  return param('id').isMongoId().withMessage('Must provide a valid MongoDB ObjectId');
};

const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const userValidationRules = () => {
  return [
    body('firstName')
      .notEmpty().withMessage('First name is required')
      .isString().withMessage('First name must be a string')
      .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
    
    body('lastName')
      .notEmpty().withMessage('Last name is required')
      .isString().withMessage('Last name must be a string')
      .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
    
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Must provide a valid email address')
      .normalizeEmail(),
    
    body('favoriteColor')
      .optional()
      .isString().withMessage('Favorite color must be a string'),
    
    body('birthday')
      .optional()
      .isISO8601().withMessage('Birthday must be a valid date in ISO8601 format'),

    body('role')
      .optional()
      .isString().withMessage('Role must be a string')
      .isIn(['user', 'admin']).withMessage('Role must be either user or admin'),

    body('isActive')
      .optional()
      .isBoolean().withMessage('isActive must be a boolean'),

    checkValidationResult
  ];
};

const validateId = () => {
  return [
    validateObjectId(),
    checkValidationResult
  ];
};

module.exports = {
  userValidationRules,
  validateId
};