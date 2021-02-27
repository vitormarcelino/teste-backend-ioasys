'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    
  };
  Movie.init({
    title: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    director: DataTypes.STRING,
    genre: DataTypes.STRING,
    actors: DataTypes.TEXT,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Movie',
  });

  Movie.addHook('beforeFind', (options) => {
    if (!options.attributes) {
      options.attributes = {};
      options.attributes.exclude = [ 'createdAt', 'updatedAt', 'deletedAt'];
    }
    return options;
  });

  return Movie;
};