'use strict';
const {VEHICLES_TABLE, vehiclesSchema} = require('./../models/vehiclesModel')

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(VEHICLES_TABLE, 'model', vehiclesSchema.model)
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(VEHICLES_TABLE, 'model')

  }
};

