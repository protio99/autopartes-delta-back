'use strict';
const {DataTypes} = require('sequelize');
const {PRODUCTS_TABLE} = require('./../models/productsModel')
const {BRANDS_TABLE, brandsSchema} = require('./../models/brandsModel')
const {VEHICLES_TABLE, vehiclesSchema} = require('./../models/vehiclesModel')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(BRANDS_TABLE,brandsSchema);
    await queryInterface.createTable(VEHICLES_TABLE,vehiclesSchema);
    await queryInterface.changeColumn(PRODUCTS_TABLE, 'idBrand', {
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
  await queryInterface.changeColumn(PRODUCTS_TABLE, 'idVehicle', {
    allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_vehicle',
        references: {
            model: VEHICLES_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
})
  },

  async down (queryInterface) {
    await queryInterface.dropTable(BRANDS_TABLE);
    await queryInterface.dropTable(VEHICLES_TABLE);
  }
};