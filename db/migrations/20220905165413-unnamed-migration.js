'use strict';
const {DataTypes} = require('sequelize');
const {MODULES_TABLE} = require('./../models/modulesModel')
module.exports = {
  async up (queryInterface) {
<<<<<<< HEAD
    await queryInterface.addColumn(MODULES_TABLE, 'name', {
=======
    await queryInterface.addColumn(MODULES_TABLE,'name', {
>>>>>>> 6a3c4a4fa9331cbf6d0fcb249a50af5e061b4130
      allowNull: false,
      type: DataTypes.STRING(50),
      unique: true,
  }
  )
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(MODULES_TABLE, 'name')
  }
};
