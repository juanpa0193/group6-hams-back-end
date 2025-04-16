const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// router.get('/', userController.test);
router.post('/signUp', userController.signUpUser);
router.get('/:id', userController.getUserInfo);
router.get('/patientInfo/:id', userController.getPatientInfo);
router.get('/doctorInfo/:id', userController.getDoctorInfo);

module.exports = router;
