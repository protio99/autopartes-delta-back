const { Model, DataTypes } = require('sequelize');
const { USERS_TABLE } = require('./usersModel');

const CLIENTS_TABLE = 'clients';

//DEFINE LA ESTRUCTURA DE LA BD
const clientsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  idUser: {
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: false,
    field: 'id_user',
    references: {
      model: USERS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(100),
    unique: false,
  },
  lastname: {
    allowNull: false,
    type: DataTypes.STRING(200),
    unique: false,
  },
  documentType: {
    allowNull: false,
    type: DataTypes.STRING(100),
    unique: false,
    field: 'document_type',
  },
  document: {
    allowNull: false,
    type: DataTypes.STRING(50),
    unique: false,
  },
  telephone: {
    allowNull: false,
    type: DataTypes.STRING(20),
    unique: false,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING(100),
    unique: false,
  },
  country: {
    allowNull: false,
    type: DataTypes.STRING(100),
    unique: false,
  },
  department: {
    allowNull: false,
    type: DataTypes.STRING(100),
    unique: false,
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING(100),
    unique: false,
  },
  neightboorhood: {
    allowNull: false,
    type: DataTypes.STRING(100),
    unique: false,
  },
  address: {
    allowNull: false,
    type: DataTypes.STRING(200),
    unique: false,
  },
  indications: {
    allowNull: true,
    type: DataTypes.STRING(500),
    unique: false,
  },
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    unique: false,
  },
};

class Clients extends Model {
  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'id',
      as: 'users',
    });
    this.hasOne(models.Sales, {
      as: 'sales',
      foreignKey: 'idClient',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENTS_TABLE,
      modelName: 'Clients',
      timestamps: false,
    };
  }
}

module.exports = { CLIENTS_TABLE, clientsSchema, Clients };
