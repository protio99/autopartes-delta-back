'use strict';
const {DataTypes} = require('sequelize');

const {PRODUCTS_TABLE} = require('./../models/productsModel')
const {categoriesSchema, CATEGORIES_TABLE} = require('./../models/categoriesModel')
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORIES_TABLE,categoriesSchema);
    await queryInterface.createTable(PRODUCTS_TABLE,{
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      idCategory: {
          allowNull: false,
          type: DataTypes.INTEGER,
          unique: false,
          field: 'id_category',
          references: {
              model: CATEGORIES_TABLE,
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
  
      idVehicle: {
          allowNull: false,
          type: DataTypes.INTEGER,
          unique: false,
          field: 'id_vehicle',
      },
    
      photo: {
          allowNull: false,
          type: DataTypes.STRING(200),
          unique: false,
          
      },
      name: {
          allowNull: false,
          type: DataTypes.STRING(50),
          unique: false,
          
      },
      amount: {
          allowNull: true,
          type: DataTypes.INTEGER,
          unique: false,
          
      },
      price: {
          allowNull: false,
          type: DataTypes.FLOAT,
          unique: false,
          
      },
      description: {
          allowNull: false,
          type: DataTypes.STRING(500),
          unique: false,
        
      },
      state: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          unique: false,
      
      },
      iva: {
          allowNull: false,
          type: DataTypes.FLOAT,
          unique: false,
          
      }
  });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CATEGORIES_TABLE);
    await queryInterface.dropTable(PRODUCTS_TABLE);
  }
};
