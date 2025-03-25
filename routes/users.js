const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { userValidationRules, validateId } = require('../middleware/userValidation');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', 
  /* #swagger.summary = "Get all users"
     #swagger.responses[200] = {
         description: "List of users",
         schema: { type: "array", items: { $ref: "#/definitions/User" } }
     }
  */
  usersController.getAll);

router.get('/:id', 
  validateId(), 
  /* #swagger.summary = "Get a single user"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "User ID",
         required: true,
         type: "string"
     }
     #swagger.responses[200] = {
         description: "User details",
         schema: { $ref: "#/definitions/User" }
     }
  */
  usersController.getSingle);

router.post('/', 
  userValidationRules(), 
  isAuthenticated,
  /* #swagger.summary = "Create a new user"
     #swagger.parameters['body'] = {
         in: 'body',
         description: "User information",
         required: true,
         schema: { $ref: "#/definitions/User" }
     }
     #swagger.responses[201] = {
         description: "User created successfully",
         schema: { $ref: "#/definitions/User" }
     }
  */
  usersController.createUser);

router.put('/:id', 
  validateId(), 
  userValidationRules(), 
  isAuthenticated,
  /* #swagger.summary = "Update a user"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "User ID",
         required: true,
         type: "string"
     }
     #swagger.parameters['body'] = {
         in: 'body',
         description: "Updated user information",
         required: true,
         schema: { $ref: "#/definitions/User" }
     }
     #swagger.responses[200] = {
         description: "User updated successfully",
         schema: { $ref: "#/definitions/User" }
     }
  */
  usersController.updateUser);

router.delete('/:id', 
  validateId(), 
  isAuthenticated,
  /* #swagger.summary = "Delete a user"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "User ID",
         required: true,
         type: "string"
     }
     #swagger.responses[200] = {
         description: "User deleted successfully"
     }
  */
  usersController.deleteUser);

module.exports = router;