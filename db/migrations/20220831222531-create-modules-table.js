'use strict';
const {modulesSchema, MODULES_TABLE} = require('./../models/modulesModel')
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(MODULES_TABLE,modulesSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(MODULES_TABLE);
  }
};
