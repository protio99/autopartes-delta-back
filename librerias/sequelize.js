const { Sequelize } = require('sequelize');
const config = require('./../config/config');
const setupModels = require('./../db/models');



const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
  host: config.dbHost,
  dialect: 'mysql',
  logging: true,
});

setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;