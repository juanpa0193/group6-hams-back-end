const model = require('../../models');

function getDoctorsAll(req, res) {
    model.Doctor.findAll().then( result => {
        res.status(200).json(result);
    })
    .catch( error => {
        res.status(500).json({
            message: "Something went wrong."
        });
    });
}

module.exports = {
    getDoctorsAll: getDoctorsAll
}