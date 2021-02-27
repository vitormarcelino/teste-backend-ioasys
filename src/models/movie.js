'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {

    static associate(models) {
      // define association here
    }

    computeVote(note, userId) {
      if (!Number.isInteger(note) || note < 0 || note > 4) {
        return 'Inválid Note'
      }

      sequelize.models.Vote.create({
        movie_id: this.id,
        note: note,
        user_id: userId
      })
      console.log([this.title, note])
    }

    async getAverageVotes() {
      let votes = await sequelize.models.Vote.findAll({ where: { movie_id: this.id }})
      let sumVotes = votes.reduce((sum, vote) => sum + vote.note, 0)
      return (sumVotes/votes.length).toFixed(1)
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
      options.attributes.exclude = ['createdAt', 'updatedAt', 'deletedAt'];
    }
    return options;
  });

  return Movie;
};