'use strict';
const {usersHelpSchema, USERS_HELP_TABLE} = require('./../models/usersHelpModel')
const {modulesSchema, MODULES_TABLE} = require('./../models/modulesModel')
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(MODULES_TABLE,modulesSchema);
    await queryInterface.createTable(USERS_HELP_TABLE,usersHelpSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(MODULES_TABLE);
    await queryInterface.dropTable(USERS_HELP_TABLE);
  }
};
