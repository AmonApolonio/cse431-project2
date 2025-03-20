const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const { productValidationRules, validateId } = require('../middleware/productValidation');

router.get('/', productsController.getAllProducts);
router.get('/:id', validateId(), productsController.getSingleProduct);

router.post('/', productValidationRules(), productsController.createProduct);
router.put('/:id', validateId(), productValidationRules(), productsController.updateProduct);
router.delete('/:id', validateId(), productsController.deleteProduct);

module.exports = router;
