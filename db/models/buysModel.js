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
    allowNull: true,
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
  datePurchase: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'date_purchase',
    unique: false,
    
  },
  invoiceNumber: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    field: 'invoice_number',
  },
  totalPurchase: {
    allowNull: false,
    type: DataTypes.FLOAT,
    unique: false,
    field: 'total_purchase',
  },
  shippingPrice: {
    allowNull: true,
    type: DataTypes.FLOAT,
    field: 'shipping_price',
  },
   ivaPercentage: {
    allowNull: true,
    type: DataTypes.FLOAT,
    unique: false,
    field: 'iva_percentage',

  },
  totalIva: {
    allowNull: true,
    type: DataTypes.FLOAT,
    unique: false,
    field: 'total_iva',

  },
  otherTaxesPercentage: {
    allowNull: true,
    type: DataTypes.FLOAT,
    field: 'other_taxes_percentage',
  },
  totalOtherTaxes: {
    allowNull: true,
    type: DataTypes.FLOAT,
    field: 'total_other_taxes',
  },
  discountsPercentage: {
    allowNull: true,
    type: DataTypes.FLOAT,
    field: 'discounts_percentage',
  },
  totalDiscounts: {
    allowNull: true,
    type: DataTypes.FLOAT,
    field: 'total_discounts',
  },
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    unique: false,
    defaultValue: true,
  },
  invoiceUrl: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: false,
    field: 'invoice_url',
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
