'use strict';
const {DataTypes} = require('sequelize');
const {PRODUCTS_TABLE} = require('./../models/productsModel')
const {BRANDS_TABLE, brandsSchema} = require('./../models/brandsModel')
const {VEHICLES_TABLE} = require('./../models/vehiclesModel')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(BRANDS_TABLE,brandsSchema);
    await queryInterface.createTable(VEHICLES_TABLE,{
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      name: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: false,
      },
      idBrand: {
          allowNull: false,
          type: DataTypes.INTEGER,
          unique: false,
          field: 'id_brand',
          
      }
  });
  
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