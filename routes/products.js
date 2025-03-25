const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const { productValidationRules, validateId } = require('../middleware/productValidation');
const { isAuthenticated } = require('../middleware/authenticate.js')

router.get('/', 
  /* #swagger.summary = "Get all products"
     #swagger.responses[200] = {
         description: "List of products",
         schema: { type: "array", items: { $ref: "#/definitions/Product" } }
     }
  */
  productsController.getAllProducts);

router.get('/:id', 
  validateId(), 
  /* #swagger.summary = "Get a single product"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "Product ID",
         required: true,
         type: "string"
     }
     #swagger.responses[200] = {
         description: "Product details",
         schema: { $ref: "#/definitions/Product" }
     }
  */
  productsController.getSingleProduct);

router.post('/', 
  productValidationRules(), 
  isAuthenticated,
  /* #swagger.summary = "Create a new product"
     #swagger.parameters['body'] = {
         in: 'body',
         description: "Product information",
         required: true,
         schema: { $ref: "#/definitions/Product" }
     }
     #swagger.responses[201] = {
         description: "Product created successfully",
         schema: { $ref: "#/definitions/Product" }
     }
  */
  productsController.createProduct);

router.put('/:id', 
  validateId(), 
  productValidationRules(), 
  isAuthenticated,
  /* #swagger.summary = "Update a product"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "Product ID",
         required: true,
         type: "string"
     }
     #swagger.parameters['body'] = {
         in: 'body',
         description: "Updated product information",
         required: true,
         schema: { $ref: "#/definitions/Product" }
     }
     #swagger.responses[200] = {
         description: "Product updated successfully",
         schema: { $ref: "#/definitions/Product" }
     }
  */
  productsController.updateProduct);

router.delete('/:id', 
  validateId(),
  isAuthenticated,
  /* #swagger.summary = "Delete a product"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "Product ID",
         required: true,
         type: "string"
     }
     #swagger.responses[200] = {
         description: "Product deleted successfully"
     }
  */
  productsController.deleteProduct);

module.exports = router;
