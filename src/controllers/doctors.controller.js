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

function putDoctorData(req, res) {

    const paramId = req.params.id;

    const dataToUpdate = {
        specialty: req.body.specialty,
        department: req.body.department,
        license_number: req.body.license_number,
        biography: req.body.biography || null,
        education: req.body.education,
        image_url: req.body.image_url || null,
        rating: req.body.rating || null,
        review_count: req.body.review_count || null
    }

    model.Doctor.findOne({where: {user_Id: paramId}}).then(user => {

        if(user === null){
            res.status(401).json({
                message:"UserId for doctor not found."
            });
        } else {

            model.Doctor.update(dataToUpdate, {where: {user_Id: paramId}}).then( result => {
                res.status(200).json({
                    message: "Updated doctor data successfully",
                    updatedData: dataToUpdate
                })
            }).catch( error => {
                res.status(500).json({
                    message: "Something went wrong when updating the doctor data",
                    error: error
                })
            })
        }
    })
}

module.exports = {
    getDoctorsAll: getDoctorsAll,
    putDoctorData: putDoctorData
}