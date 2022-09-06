'use strict';
const {VEHICLES_TABLE} = require('./../models/vehiclesModel');
const {BRANDS_TABLE} = require('./../models/brandsModel');
const {DataTypes} = require('sequelize');


module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(VEHICLES_TABLE, 'idBrand', {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false,
      field: 'id_brand',
      references: {
          model: BRANDS_TABLE,
          key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
  })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
