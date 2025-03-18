'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DoctorAvailabilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctor_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Doctors',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      day_of_week: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      start_time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      end_time: {
        allowNull: false,
        type: Sequelize.TIME
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
            await queryInterface.addConstraint('DoctorAvailabilities', {
              fields: ['doctor_id', 'day_of_week', 'start_time'],
              type: 'unique',
              name: 'unique_doctor_day_time'
            });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DoctorAvailabilities');
  }
};