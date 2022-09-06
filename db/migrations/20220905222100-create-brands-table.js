'use strict';
const {BRANDS_TABLE, brandsSchema} = require('./../models/brandsModel')


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(BRANDS_TABLE,brandsSchema);
    
  },

  async down (queryInterface) {
    await queryInterface.dropTable(BRANDS_TABLE);

  }
};
