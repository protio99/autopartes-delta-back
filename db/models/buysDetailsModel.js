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
    type: DataTypes.INTEGER,
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
    unique: false,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
    unique: false,
  },
  iva: {
    allowNull: false,
    type: DataTypes.FLOAT,
    unique: false,
  },
  othersTaxes: {
    allowNull: false,
    type: DataTypes.FLOAT,
    unique: false,
  },
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
