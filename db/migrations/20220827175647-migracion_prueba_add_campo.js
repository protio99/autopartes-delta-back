'use strict';
const {categoriesSchema, CATEGORIES_TABLE} = require('./../models/categoriesModel')
module.exports = {
  async up (queryInterface) {
   await queryInterface.addColumn(CATEGORIES_TABLE, 'campo_prueba_migracion', categoriesSchema.campo_prueba_migracion)
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(CATEGORIES_TABLE, 'campo_prueba_migracion')
  }

};
