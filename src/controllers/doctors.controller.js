const model = require('../../models');

const getDoctorsAll = async (req, res) => {

    try {
        const doctors = await model.Doctor.findAll({
                include: [{
                    model: model.User,
                    as: 'user',
                    attributes: ['firstName', 'lastName', 'email','phoneNumber']
                }]
        });

        const formattedDoctorData = doctors.map(doctors => {
            return {
                userId: doctors.user_Id,
                name: doctors.user.firstName + ' ' + doctors.user.lastName,
                email: doctors.user.email,
                phoneNumber: doctors.user.phoneNumber,
                specialty: doctors.specialty,
                department: doctors.department,
                licenseNumber: doctors.license_number,
                biography: doctors.biography,
                education: doctors.education,
                imageUrl: doctors.image_url,
                rating: doctors.rating,
                reviewCount: doctors.review_count
            }
        });

        res.status(200).json(formattedDoctorData);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving doctors",
            error: error.message
        })
    };
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