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
                emergencyContactRelation: patient.emergency_contact_relation,
                emergencyContactPhone: patient.emergency_contact_phone
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

async function updateUser(req, res) {
    try {
        const userId = req.params.id; // Get the user ID from the route parameter
        const updatedData = {
            ...req.body,
            emergencyContact: req.body.emergencyContact || {} // Default to an empty object if not provided
        };

        // Find the user by ID
        const user = await model.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's information in the Users table
        const userFields = {
            firstName: updatedData.firstName || user.firstName,
            lastName: updatedData.lastName || user.lastName,
            email: updatedData.email || user.email,
            phoneNumber: updatedData.phoneNumber || user.phoneNumber
        };
        await user.update(userFields);

        // If the user is a Patient, update the Patient table as well
        if (user.userType === 'Patient') {
            const patient = await model.Patient.findOne({ where: { user_id: userId } });
            if (patient) {
                const patientFields = {
                    date_of_birth: updatedData.dateOfBirth || patient.date_of_birth,
                    gender: updatedData.gender || patient.gender,
                    blood_type: updatedData.bloodType || patient.blood_type,
                    address: updatedData.address || patient.address,
                    emergency_contact_name: updatedData.emergencyContact?.name || patient.emergency_contact_name,
                    emergency_contact_relation: updatedData.emergencyContact?.relation || patient.emergency_contact_relation,
                    emergency_contact_phone: updatedData.emergencyContact?.phone || patient.emergency_contact_phone
                };
                await patient.update(patientFields);
            }
        }

        // If the user is a Doctor, update the Doctor table as well
        if (user.userType === 'Doctor') {
            const doctor = await model.Doctor.findOne({ where: { user_id: userId } });
            if (doctor) {
                const doctorFields = {
                    specialty: updatedData.specialty || doctor.specialty,
                    department: updatedData.department || doctor.department,
                    license_number: updatedData.licenseNumber || doctor.license_number,
                    biography: updatedData.biography || doctor.biography,
                    education: updatedData.education || doctor.education,
                    image_url: updatedData.imageUrl || doctor.image_url
                };
                await doctor.update(doctorFields);
            }
        }

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Failed to update user", error: error.message });
    }
}

module.exports = {
    test: test,
    signUpUser: signUpUser,
    getUserInfo: getUserInfo,
    updateUser: updateUser
    getPatientInfo: getPatientInfo
}