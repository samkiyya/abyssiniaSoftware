const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/edit',  userController.editUser);
router.post('/logout',  userController.logout);
router.get('/all',  userController.getAllUsers);
router.delete('/delete',  userController.deleteAccount);

module.exports = router;
