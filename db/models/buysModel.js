const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROVIDERS_TABLE } = require('./providersModel');

const BUYS_TABLE = 'buys';

//DEFINE LA ESTRUCTURA DE LA BD
const buysSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  idProvider: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    field: 'id_provider',
    references: {
      model: PROVIDERS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  date: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'date_purchase',
    unique: false,
    defaultValue: DataTypes.NOW,
  },
  invoiceNumber: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
    field: 'invoice_number',
  },
  totalPurchase: {
    allowNull: false,
    type: DataTypes.FLOAT,
    unique: false,
    field: 'total_purchase',
  },
  totalIva: {
    allowNull: false,
    type: DataTypes.FLOAT,
    unique: false,
    field: 'total_iva',

  },
  totalOtherTaxes: {
    type: DataTypes.FLOAT,
    field: 'total_other_taxes',
  },
  total: {
    allowNull: false,
    type: DataTypes.FLOAT,
    unique: false,
  },
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    unique: false,
    defaultValue: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.NOW,
    field: 'created_at',
    unique: false,
  },
};

class Buys extends Model {
  static associate(models) {
    this.belongsTo(models.Providers, {
      as: 'provider',
      foreignKey: 'idProvider',
    });
    this.hasMany(models.BuysDetails, {
      as: 'buy_detail',
      foreignKey: 'idBuy',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BUYS_TABLE,
      modelName: 'Buys',
      timestamps: false,
    };
  }
}

module.exports = { BUYS_TABLE, buysSchema, Buys };
