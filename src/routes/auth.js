const express = require('express');
const authController = require('../controllers/auth.controller')

const router = express.Router();

// Route for user login
router.post('/',authController.login);

// Route to fetch user data by ID
router.get('/users/:id', authController.getUserById);

module.exports = router;