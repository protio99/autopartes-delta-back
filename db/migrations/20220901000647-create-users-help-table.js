'use strict';
const {usersHelpSchema, USERS_HELP_TABLE} = require('./../models/usersHelpModel')
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USERS_HELP_TABLE,usersHelpSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USERS_HELP_TABLE);
  }
};