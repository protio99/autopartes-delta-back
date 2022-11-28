const { Model, DataTypes } = require('sequelize');
const { ROLES_TABLE } = require('./../models/rolesModel');
const { MODULES_TABLE } = require('./../models/modulesModel');

const ROLES_PERMISSIONS_TABLE = 'roles_permisions';

//DEFINE LA ESTRUCTURA DE LA BD
const rolesPermissionsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  idRol: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    field: 'id_rol',
    references: {
      model: ROLES_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  idModule: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    field: 'id_module',
    references: {
      model: MODULES_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
};

class RolesPermissions extends Model {
  static associate(models) {
    // this.belongsTo(models.Permissions, {
    //     as:'permissions',
    //     foreignKey: 'idPermissions'});

    //     this.belongsTo(models.Roles, {
    //     as:'roles',
    //     foreignKey: 'idRol'})
    this.belongsTo(models.Modules, {
      as: 'modules',
      foreignKey: 'idModule',
    });
    this.belongsTo(models.Roles, {
      as: 'roles',
      foreignKey: 'idRol',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLES_PERMISSIONS_TABLE,
      modelName: 'RolesPermissions',
      timestamps: false,
    };
  }
}

module.exports = {
  ROLES_PERMISSIONS_TABLE,
  rolesPermissionsSchema,
  RolesPermissions,
};
