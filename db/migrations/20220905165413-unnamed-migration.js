'use strict';
const {DataTypes} = require('sequelize');
const {MODULES_TABLE} = require('./../models/modulesModel')
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(MODULES_TABLE,'name', {
      allowNull: false,
      type: DataTypes.STRING(50),
      unique: true,
  })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(MODULES_TABLE, 'name')
  }
};
