'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    
  };
  Admin.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Admin',
  });

  Admin.addHook('beforeFind', (options) => {
    if (!options.attributes) {
      options.attributes = {};
      options.attributes.exclude = [ 'createdAt', 'updatedAt', 'deletedAt', 'password'];
    }
    return options;
  });

  return Admin;
};