'use strict';
const {DataTypes} = require('sequelize');

const {QUOTATION_TABLE} = require('./../models/quotationModel')
const {USERS_TABLE} = require('./../models/usersModel')
module.exports = {
  async up (queryInterface) {
    
    await queryInterface.createTable(QUOTATION_TABLE,{
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      idUser: {
          allowNull: false,
          type: DataTypes.INTEGER,
          unique: false,
          field: 'id_user',
          references: {
              model: USERS_TABLE,
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      
  });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(QUOTATION_TABLE);

  }
};
