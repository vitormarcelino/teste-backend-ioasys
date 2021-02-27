'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    
    static associate(models) {
      // define association here
    }
    
  };
  Vote.init({
    movie_id: {
      type: DataTypes.INTEGER
    },
    note: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 4,
      }
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    paranoid: true,
    timestamps: false,
    modelName: 'Vote',
  });

  return Vote;
};