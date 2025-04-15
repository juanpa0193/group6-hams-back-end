const models = require('../../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../../models');

function login(req,res){
    
    models.User.findOne({where: {email: req.body.email}}).then(user => {

        if(user === null){
            res.status(401).json({
                message: "Invalid credentials.",
            });
        } else {
            bcryptjs.compare(req.body.password, user.password, function(err,result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id,
                        userType: user.userType
                    },'secret',function(err,token){
                        console.log('JWT generation error:', err); // DEBUGGING: Log JWT errors
                        console.log('Generated token:', token); // DEBUGGING: Log generated token
                        res.status(200).json({
                            message: "Authentication successful!",
                            token: token
                        })
                    })
                } else {
                    console.log('Password did not match'); // DEBUGGING: Log failed password match
                    res.status(401).json({
                        message: "Invalid credentials.",
                    });
                }
            })
        }

    }).catch(error => {
        console.log('DB Error'); // DEBUGGING: Log failed password match
        res.status(500).json(({
            message: "Something went wrong",
        }))

    });
}

function getUserById(req, res) {
    const userId = req.params.id; // Extract userId from the request parameters

    models.User.findByPk(userId, {
        include: [
          {
            model: models.Patient,
            as: 'patient' // Alias defined in the association
          }
        ]
    }).then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Combine user and patient data
        const userData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            userType: user.userType,
            patient: user.patient // Include patient data if available
        };

        res.status(200).json(userData);
    }).catch(error => {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Something went wrong.' });
    });
}

module.exports = {
    login: login,
    getUserById: getUserById
};