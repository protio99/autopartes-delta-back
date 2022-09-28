const { Model, DataTypes } = require('sequelize');
const { PRODUCTS_TABLE } = require('./productsModel');
const { SALES_TABLE } = require('./salesModel');

const SALES_DETAILS_TABLE = 'sales_details';

//DEFINE LA ESTRUCTURA DE LA BD
const salesDetailsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  idSale: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    field: 'id_sale',
    references: {
      model: SALES_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  idProduct: {
    allowNull: false,
    type: DataTypes.STRING(25),
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
  otherTaxes: {
    allowNull: false,
    type: DataTypes.FLOAT,
    unique: false,
    field: 'other_taxes',
  },
};

class SalesDetails extends Model {
  static associate(models) {
    this.belongsTo(models.Sales, {
      as: 'sales',
      foreignKey: 'idSale',
    });
    this.belongsTo(models.Products, {
      as: 'products',
      foreignKey: 'idProduct',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SALES_DETAILS_TABLE,
      modelName: 'SalesDetails',
      timestamps: false,
    };
  }
}

module.exports = { SALES_DETAILS_TABLE, salesDetailsSchema, SalesDetails };
