'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with User
      Patient.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user' // Alias for the association
      });
    }
  }
  Patient.init({
    user_id: DataTypes.INTEGER,
    date_of_birth: DataTypes.DATE,
    gender: DataTypes.STRING,
    blood_type: DataTypes.STRING,
    address: DataTypes.TEXT,
    emergency_contact_name: DataTypes.STRING,
    emergency_contact_relation: DataTypes.STRING,
    emergency_contact_phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};