const { Model, DataTypes, Sequelize } = require('sequelize');

const ROLES_TABLE = 'roles';

//DEFINE LA ESTRUCTURA DE LA BD
const rolesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(50),
    unique: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.NOW,
    unique: false,
    field: 'created_at',
  },
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    unique: false,
    defaultValue: true,
  },
};

class Roles extends Model {
  static associate(models) {
    // this.hasMany(models.RolesPermissions, {
    //   as: 'roles_permissions',
    //   foreignKey: 'idPermissions',
    // });
    this.hasMany(models.Users, {
      as: 'users',
      foreignKey: 'idRol',
    });
    this.belongsToMany(models.Permissions, {
      as: 'roles_permissions',
      through: models.RolesPermissions,
      foreignKey: 'idRol',
      otherKey: 'idPermissions',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLES_TABLE,
      modelName: 'Roles',
      timestamps: false,
    };
  }
}

module.exports = { ROLES_TABLE, rolesSchema, Roles };
