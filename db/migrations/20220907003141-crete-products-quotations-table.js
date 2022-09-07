'use strict';
const {DataTypes} = require('sequelize');

const {PRODUCTS_QUOTATIONS_TABLE} = require('./../models/productsQuotationsModel')
const {PRODUCTS_TABLE} = require('./../models/productsModel')
const {QUOTATION_TABLE} = require('./../models/quotationModel')
module.exports = {
  async up (queryInterface) {
    
    await queryInterface.createTable(PRODUCTS_QUOTATIONS_TABLE,{
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      idProduct: {
          allowNull: false,
          type: DataTypes.INTEGER,
          field: 'id_product',
          references: {
              model: PRODUCTS_TABLE,
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      idQuotation: {
          allowNull: false,
          type: DataTypes.INTEGER,
          unique: false,
          field: 'id_quotation',
          references: {
              model: QUOTATION_TABLE,
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
  
      amount: {
          allowNull: false,
          type: DataTypes.INTEGER,
                  
      },
      
  });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PRODUCTS_QUOTATIONS_TABLE);

  }
};
