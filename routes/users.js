const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { userValidationRules, validateId } = require('../middleware/userValidation');

router.get('/', usersController.getAll);
router.get('/:id', validateId(), usersController.getSingle);

router.post('/', userValidationRules(), usersController.createUser);
router.put('/:id', validateId(), userValidationRules(), usersController.updateUser);
router.delete('/:id', validateId(), usersController.deleteUser);

module.exports = router;