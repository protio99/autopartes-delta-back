'use strict';
const {PRODUCTS_TABLE,productsSchema} = require('./../models/productsModel')

module.exports = {
  async up (queryInterface) {
    await queryInterface.removeColumn(PRODUCTS_TABLE, 'idBrand')
  },

  async down (queryInterface) {
    await queryInterface.addColumn(PRODUCTS_TABLE, 'idBrand', productsSchema.model)  
  

  }
};

