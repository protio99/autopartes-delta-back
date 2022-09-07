'use strict';
const {DataTypes, Sequelize} = require('sequelize');

const {USERS_TABLE} = require('./../models/usersModel')
module.exports = {
  async up (queryInterface) {
    
    await queryInterface.createTable(USERS_TABLE,{
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      idRol: {
          allowNull: false,
          type: DataTypes.INTEGER,
          unique: false,
          field: 'id_rol'
      },
      email: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
      },
      password: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: false,
      },
      status: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          unique: false,
      },
      name: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: false,
      },
      lastname: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: false,
      },
      createdAt: {
          allowNull: false,
          type: DataTypes.DATEONLY,
          defaultValue: Sequelize.NOW,
          field: 'created_at',
          unique: false,
      }
  });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USERS_TABLE);

  }
};
