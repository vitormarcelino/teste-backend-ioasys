'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    
  };
  User.init({
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
    name: DataTypes.STRING,
    birthday: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'User',
  });

  User.addHook('beforeFind', (options) => {
    if (!options.attributes) {
      options.attributes = {};
      options.attributes.exclude = [ 'createdAt', 'updatedAt', 'deletedAt', 'password'];
    }
    return options;
  });

  return User;
};