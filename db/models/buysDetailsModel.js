const { Model, DataTypes } = require('sequelize');
const { BUYS_TABLE } = require('./buysModel');
const { PRODUCTS_TABLE } = require('./productsModel');

const BUYS_DETAILS_TABLE = 'buys_details';

//DEFINE LA ESTRUCTURA DE LA BD
const buysDetailsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  idBuy: {
    allowNull: false,
    type: DataTypes.STRING(30),
    unique: false,
    field: 'id_buy',
    references: {
      model: BUYS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  idProduct: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: false,
    field: 'id_product',
    references: {
      model: PRODUCTS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  netPrice: {
    allowNull: false,
    type: DataTypes.FLOAT,
    field: 'net_price',
  },
  shippingPrice: {
    allowNull: true,
    type: DataTypes.FLOAT,
    field: 'shipping_price',
  },
  discountsPercentage: {
    allowNull: true,
    type: DataTypes.FLOAT,
    field: 'discounts_percentage',
  },
  ivaPercentage: {
    allowNull: true,
    type: DataTypes.FLOAT,
    field: 'iva_percentage',

  },
  profitPercentage: {
    allowNull: false,
    type: DataTypes.FLOAT,
    field: 'profit_percentage',
  },
  salePrice: {
    allowNull: false,
    type: DataTypes.FLOAT,
    field: 'sale_price',
  }

};

class BuysDetails extends Model {
  static associate(models) {
    this.belongsTo(models.Buys, {
      as: 'buy',
      foreignKey: 'idBuy',
    });
    this.belongsTo(models.Products, {
      as: 'products',
      foreignKey: 'idProduct',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BUYS_DETAILS_TABLE,
      modelName: 'BuysDetails',
      timestamps: false,
    };
  }
}

module.exports = { BUYS_DETAILS_TABLE, buysDetailsSchema, BuysDetails };
