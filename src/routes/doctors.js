const express = require('express');
const doctorController = require('../controllers/doctors.controller');

const router = express.Router();

router.get('/', doctorController.getDoctorsAll);
router.put('/:id',doctorController.putDoctorData);

module.exports = router;