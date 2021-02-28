module.exports = {
  apps : [{
    script: 'node_modules/.bin/sequelize db:migrate && node_modules/.bin/sequelize db:seed:all && npm run start',
    watch: false
  }]
};
