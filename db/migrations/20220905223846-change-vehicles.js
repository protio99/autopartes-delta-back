'use strict';
const {DataTypes} = require('sequelize');
const {VEHICLES_TABLE} = require('./../models/vehiclesModel')

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(VEHICLES_TABLE, 'model', {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false,
})
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(VEHICLES_TABLE, 'model')

  }
};

