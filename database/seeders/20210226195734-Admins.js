'use strict';
const bcrypt = require('bcryptjs')
const { Op } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = {
      email: process.env.ADMIN_DEFAULT_EMAIL,
      username: process.env.ADMIN_DEFAULT_USERNAME,
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW'),
      password: bcrypt.hashSync(process.env.ADMIN_DEFAULT_PASSWORD)
    }
    await queryInterface.bulkInsert('Admins', [data], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admins', {username: {[Op.eq]: 'admin_ioasys'}}, {})
  }
};
