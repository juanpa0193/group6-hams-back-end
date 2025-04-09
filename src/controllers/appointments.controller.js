const model = require('../../models');
const moment = require('moment');

function getAppointmentTypes(req, res) {

    model.AppointmentTypes.findAll().then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({
            message: "Something went wrong."
        });
    })
}

function postScheduleAppointment(req, res) {

    const patientId = req.params.id;

    const appointmentDate = formatDate(req.body.date);
    console.log(appointmentDate);

    const appointmentStartTime = formatTime(req.body.time);
    console.log(appointmentStartTime);

    // const appointmentEndTime = moment(appointmentStartTime).add(1, 'hour');
    const appointmentEndTime = moment(appointmentStartTime, 'HH:mm').add(1, 'hour').format('HH:mm');
    console.log(appointmentEndTime);

    // const createdAt = moment().format('YYYY-MM-DD HH:mm:ss')

    const appointment = {
        patient_id: patientId,
        doctor_id: req.body.doctor_id,
        appointment_date: appointmentDate,
        start_time: appointmentStartTime,
        end_time: appointmentEndTime,
        appointment_type: req.body.appointmentType,
        department: req.body.department,
        reason: req.body.reason || null,
        status: 'scheduled'
    }

    return model.Appointment.create(appointment).then( () => {
        return res.status(200).json({
            message: "Appointment successfully created!"
        })
    }).catch( err => {
        return res.status(500).json({
            message: "Something went wrong",
            error: err
        })
    });

}


function formatDate(date) {

    // Determine the input format based on the date string format
  const dateFormat = date.includes('/') ? 'MM/DD/YYYY' : 'YYYY-MM-DD';
  
  // Parse combined string to moment object
  const dateTimeObj = moment(date, dateFormat);
  
  // Format for database 
  return dateTimeObj.format('YYYY-MM-DD HH:mm:ss');

}

function formatTime(time) {

    // Determine the input format based on the date string format
  const timeFormat = time.includes('AM') || time.includes('PM') 
  ? 'h:mm A' 
  : 'HH:mm';
  
  // Parse combined string to moment object
  const dateTimeObj = moment(time, timeFormat);
  
  // Format for database 
  return dateTimeObj.format('HH:mm:ss');

}



module.exports = {
    getAppointmentTypes: getAppointmentTypes,
    postScheduleAppointment: postScheduleAppointment
}