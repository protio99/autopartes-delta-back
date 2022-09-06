'use strict';
const {DataTypes} = require('sequelize');
const {MODULES_TABLE} = require('./../models/modulesModel')
module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(MODULES_TABLE, 'name', {
      allowNull: false,
      type: DataTypes.STRING(50),
      unique: true,
  })
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
