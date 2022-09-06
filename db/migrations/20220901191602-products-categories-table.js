'use strict';
const {productsSchema, PRODUCTS_TABLE} = require('./../models/productsModel')
const {categoriesSchema, CATEGORIES_TABLE} = require('./../models/categoriesModel')
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORIES_TABLE,categoriesSchema);
    await queryInterface.createTable(PRODUCTS_TABLE,productsSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CATEGORIES_TABLE);
    await queryInterface.dropTable(PRODUCTS_TABLE);
  }
};
