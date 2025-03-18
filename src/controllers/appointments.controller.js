const model = require('../../models');

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

module.exports = {
    getAppointmentTypes: getAppointmentTypes
}