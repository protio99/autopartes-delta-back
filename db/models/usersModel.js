const { Model, DataTypes, Sequelize } = require('sequelize');
const { ROLES_TABLE } = require('./rolesModel');
const USERS_TABLE = 'users';

//DEFINE LA ESTRUCTURA DE LA BD
const usersSchema = {
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
  },
};

class Users extends Model {
  static associate(model) {
    this.hasMany(model.Quotation, {
      as: 'quotation',
      foreignKey: 'idUser',
    });
    this.belongsTo(model.Roles, {
      as: 'roles',
      foreignKey: 'idRol',
    });
    this.hasOne(model.Clients, {
      as: 'clients',
      foreignKey: 'idUser',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USERS_TABLE,
      modelName: 'Users',
      timestamps: false,
    };
  }
}

module.exports = { USERS_TABLE, usersSchema, Users };
