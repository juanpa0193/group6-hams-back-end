const express = require('express');
const appointmentsController = require('../controllers/appointments.controller');

const router = express.Router();

router.get('/types', appointmentsController.getAppointmentTypes);
router.post('/scheduleAppointment/:id', appointmentsController.postScheduleAppointment);
router.get('/:id', appointmentsController.getAppointments);

module.exports = router;