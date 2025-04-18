// const express = require('express');
const model = require('../../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../../models'); // Get the sequelize instance


function test(req , res ) {                 // DEBUGGING
    res.send("Reached the User Controller!")
};


function signUpUser(req,res) {
    model.User.findOne({where: {email: req.body.email}}).then(result => {
        if (result){
            res.status(409).json({
                message: "Account with that email alreadey exists."
            })
        } else {
            bcryptjs.genSalt(10, function(err, salt) {
                bcryptjs.hash(req.body.password, salt, function(err, hash) {

                    const userType = req.body.isDoctor === true ? 'Doctor' : 'Patient';

                    const newUser = {
                        email: req.body.email,
                        password: hash,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        phoneNumber: req.body.phoneNumber,
                        userType: userType
                    }

                    // Use a transaction to ensure data consistency
                    return sequelize.transaction(async (t) => {

                    // Create the user first
                    const user = await model.User.create(newUser, { transaction: t });
                    
                    // Based on userType, create the corresponding record
                    if (userType === 'Doctor') {
                    await model.Doctor.create({
                    user_id: user.id,
                    specialty: req.body.specialty || null,
                    department: req.body.department || null,
                    license_number: req.body.licenseNumber || null,
                    biography: req.body.biography || null,
                    education: req.body.education || null,
                    image_url: req.body.imageUrl || null,
                    rating: 0,
                    review_count: 0
                    }, { transaction: t });
                    }             
                    else if (userType === 'Patient') {
                        await model.Patient.create({
                          user_id: user.id,
                          date_of_birth: req.body.dateOfBirth || null,
                          gender: req.body.gender || null,
                          blood_type: req.body.bloodType || null,
                          address: req.body.address || null,
                          emergency_contact_name: req.body.emergencyContactName || null,
                          emergency_contact_relation: req.body.emergencyContactRelation || null,
                          emergency_contact_phone: req.body.emergencyContactPhone || null
                        }, { transaction: t });
                      }

                        return user; // Return the created user for the next .then()
                    })
                    .then(result => {
                        res.status(201).json({
                            message: "User created successfully!",
                            newUserInfo: {
                                id: result.id,
                                email: result.email,
                                userType: result.userType
                            }
                        })
                    })
                    .catch(error => {
                        res.status(500).json({
                            message: "Something went wrong.",
                            error: error.message
                        })
                    })

                })
            })
        }
    })
}

function getUserInfo(req, res){
    const userId = req.params.id;

    model.User.findOne({ where: {id: userId} }).then( user => {

        if (user === null){
            res.status(401).json({
                message: "No user found"
            })
        } else {
            const userInfo = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                type: user.userType
            }

            return res.status(200).json(userInfo);

        }
    }).catch (err => {
        res.status(500).json({
            message: "Error retrieving user:",
            error: err
        })
    })

}

function getPatientInfo(req, res){

    const userId = req.params.id;

    model.Patient.findOne({ where: {user_id: userId} }).then( patient => {

        if (patient === null){
            res.status(401).json({
                patient
            })
        } else {
            const patientInfo = {
                dateOfBirth: patient.date_of_birth,
                bloodType: patient.blood_type,
                gender: patient.gender,
                address: patient.address,
                emergencyContactName: patient.emergency_contact_name,
                emergencyContactRelationship: patient.emergency_contact_relation,
                emergencyContactPhoneNumber: patient.emergency_contact_phone
            }

            return res.status(200).json(patientInfo);

        }
    }).catch (err => {
        res.status(500).json({
            message: "Error retrieving user:",
            error: err
        })
    })
}

function getDoctorInfo(req, res){

    const userId = req.params.id;

    model.Doctor.findOne({ where: {user_id: userId} }).then( doctor => {

        if (doctor === null){
            res.status(401).json({
                message: "No doctor found by that user id."
            })
        } else {
            const doctorInfo = {
                specialty: doctor.specialty,
                department: doctor.department,
                licenseNumber: doctor.license_number,
                biography: doctor.biography,
                education: doctor.education,
                imageUrl: doctor.imageUrl,
                rating: doctor.rating,
                reviewCount: doctor.review_count
            }

            return res.status(200).json(doctorInfo);

        }
    }).catch (err => {
        res.status(500).json({
            message: "Error retrieving user:",
            error: err
        })
    })
}

module.exports = {
    test: test,
    signUpUser: signUpUser,
    getUserInfo: getUserInfo,
    getPatientInfo: getPatientInfo,
    getDoctorInfo: getDoctorInfo
}