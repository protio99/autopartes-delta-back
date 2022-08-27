'use strict';
const {categoriesSchema, CATEGORIES_TABLE} = require('./../models/categoriesModel')
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORIES_TABLE,categoriesSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CATEGORIES_TABLE);
  }
};
