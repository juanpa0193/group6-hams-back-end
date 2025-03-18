'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Relationship with User model
        Doctor.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
  });
  
        // Relationship with Appointments
        Doctor.hasMany(models.Appointment, {
        foreignKey: 'doctor_id',
        as: 'appointments'
  });
  
        // Relationship with DoctorAvailability
        Doctor.hasMany(models.DoctorAvailability, {
        foreignKey: 'doctor_id',
        as: 'availabilities'
  });
    }
  }
  Doctor.init({
    user_id: DataTypes.INTEGER,
    specialty: DataTypes.STRING,
    department: DataTypes.ENUM('General Medicine','Cardiology','Dermatology','Orthopedics','Pediatrics','Neurology'),
    license_number: DataTypes.STRING,
    biography: DataTypes.TEXT,
    education: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    review_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};