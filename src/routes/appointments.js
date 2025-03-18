const express = require('express');
const appointmentsController = require('../controllers/appointments.controller');

const router = express.Router();

router.get('/types', appointmentsController.getAppointmentTypes);

module.exports = router;