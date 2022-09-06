'use strict';
const {DataTypes} = require('sequelize');
const {USERS_HELP_TABLE} = require('./../models/usersHelpModel')
const {MODULES_TABLE} = require('./../models/modulesModel')
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(MODULES_TABLE,{
      id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    description: {
      allowNull: false,
      type: DataTypes.STRING(500),
      unique: false,
  }
});
    await queryInterface.createTable(USERS_HELP_TABLE,{
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
        idModule: {
          allowNull: false,
          type: DataTypes.INTEGER,
          unique: true,
          field: 'id_module',
          references: {
              model: MODULES_TABLE,
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
        videoURL: {
          allowNull: false,
          unique: false,
          field: 'video_url',
          type: DataTypes.STRING
      }
  
  });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(MODULES_TABLE);
    await queryInterface.dropTable(USERS_HELP_TABLE);
  }
};
