const express = require('express');
const { getUsers, createUser, getAllUser } = require('../controllers/userController');
const router = express.Router();
router.post('/login-user', getUsers); // Ensure getUsers is a valid function
router.post('/create-user', createUser); // Ensure createUser is a valid function
router.get('/get-users', getAllUser);
module.exports = router;
