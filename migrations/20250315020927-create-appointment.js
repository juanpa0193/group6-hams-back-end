'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patient_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      doctor_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      appointment_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      start_time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      end_time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      appointment_type: {
        allowNull: false,
        type: Sequelize.ENUM(['General Checkup', 'Follow Up Visit', 'General Consultation','Vaccination', 'Laboratory Tests']),
        defaultValue: 'General Checkup'
      },
      department: {
        allowNull: false,
        type: Sequelize.ENUM(['General Medicine','Cardiology','Dermatology','Orthopedics','Pediatrics','Neurology']),
        defaultValue: 'General Medicine'
      },
      reason: {
        type: Sequelize.TEXT
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(['scheduled','completed','canceled']),
        defaultValue: 'scheduled'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

        // Add the unique composite constraint
        await queryInterface.addConstraint('Appointments', {
          fields: ['doctor_id', 'appointment_date', 'start_time'],
          type: 'unique',
          name: 'unique_doctor_appointment_time'
        });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Appointments');
  }
};