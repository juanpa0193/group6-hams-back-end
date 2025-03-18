'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appointment.init({
    patient_id: DataTypes.INTEGER,
    doctor_id: DataTypes.INTEGER,
    appointment_date: DataTypes.DATE,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    appointment_type: DataTypes.ENUM('General Checkup', 'Follow Up Visit', 'General Consultation','Vaccination', 'Laboratory Tests'),
    department: DataTypes.ENUM('General Medicine','Cardiology','Dermatology','Orthopedics','Pediatrics','Neurology'),
    reason: DataTypes.TEXT,
    status: DataTypes.ENUM('scheduled','completed','canceled')
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};