'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Doctors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      specialty: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.ENUM(['General Medicine','Cardiology','Dermatology','Orthopedics','Pediatrics','Neurology']),
        defaultValue: 'General Medicine'
      },
      license_number: {
        unique: true,
        type: Sequelize.STRING
      },
      biography: {
        type: Sequelize.TEXT
      },
      education: {
        type: Sequelize.TEXT
      },
      image_url: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.DECIMAL
      },
      review_count: {
        type: Sequelize.INTEGER
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Doctors');
  }
};