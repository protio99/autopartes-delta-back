'use strict';
const {DataTypes} = require('sequelize');
const {VEHICLES_TABLE} = require('./../models/vehiclesModel')

module.exports = {
  async up (queryInterface) {
<<<<<<< HEAD
    await queryInterface.addColumn(VEHICLES_TABLE, 'model',  {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false,
  }
)
=======
    await queryInterface.addColumn(VEHICLES_TABLE, 'model', {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false,
})
>>>>>>> 6a3c4a4fa9331cbf6d0fcb249a50af5e061b4130
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(VEHICLES_TABLE, 'model')

  }
};

