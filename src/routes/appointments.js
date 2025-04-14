const express = require('express');
const appointmentsController = require('../controllers/appointments.controller');

const router = express.Router();

router.get('/types', appointmentsController.getAppointmentTypes);
router.post('/scheduleAppointment/:id', appointmentsController.postScheduleAppointment);
router.get('/:id', appointmentsController.getAppointments);
router.put('/cancelAppointment', appointmentsController.cancelAppointment);

module.exports = router;