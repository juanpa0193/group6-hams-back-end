// import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userType: {
        allowNull: false,
        type: Sequelize.ENUM('Doctor','Patient','Admin')
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
    await queryInterface.dropTable('Users');
  }
};


// Trying to convert to Typescript attempt
// module.exports = {
//   up: async (queryInterface: QueryInterface) => {
//     await queryInterface.createTable('users', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: DataTypes.INTEGER
//       },
//       email: {
//         type: DataTypes.STRING,
//         unique: true
//       },
//       password: {
//         type: DataTypes.STRING
//       },
//       firstName: {
//         type: DataTypes.STRING
//       },
//       lastName: {
//         type: DataTypes.STRING
//       },
//       phoneNumber: {
//         type: DataTypes.STRING
//       },
//       userType: {
//         type: DataTypes.CHAR(1)
//       },
//       createdAt: {
//         allowNull: false,
//         type: DataTypes.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: DataTypes.DATE
//       }
//     })
//   },
//   down: async(queryInterface: QueryInterface) => {
//     await queryInterface.dropTable('users');
//   }

// };

