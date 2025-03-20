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

const productValidationRules = () => {
    return [
        body('name')
            .notEmpty().withMessage('Name is required')
            .isString().withMessage('Name must be a string')
            .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

        body('description')
            .notEmpty().withMessage('Description is required')
            .isString().withMessage('Description must be a string'),

        body('price')
            .notEmpty().withMessage('Price is required')
            .isFloat({ gt: 0 }).withMessage('Price must be a positive number'),

        body('stockQuantity')
            .notEmpty().withMessage('Stock quantity is required')
            .isInt({ gt: -1 }).withMessage('Stock quantity must be a non-negative integer'),

        body('category')
            .notEmpty().withMessage('Category is required')
            .isString().withMessage('Category must be a string'),

        body('brand')
            .notEmpty().withMessage('Brand is required')
            .isString().withMessage('Brand must be a string'),

        body('rating')
            .optional()
            .isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),

        body('reviewCount')
            .optional()
            .isInt({ gt: -1 }).withMessage('Review count must be a non-negative integer'),

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
    productValidationRules,
    validateId
};
