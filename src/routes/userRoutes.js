const express = require('express');

const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getUser);
router.get("/:id", userController.getUserById);
router.post("/create", userController.createUser);
router.post('/login', userController.loginUser);
router.put('/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
