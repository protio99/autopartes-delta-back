const { Model, DataTypes } = require('sequelize');
const { PRODUCTS_TABLE } = require('./productsModel');
const { QUOTATION_TABLE } = require('./quotationModel');
const QUOTATIONS_DETAILS_TABLE = 'quotations_details';

//DEFINE LA ESTRUCTURA DE LA BD
const quotationsDetailsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  idProduct: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_product',
    references: {
      model: PRODUCTS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  idQuotation: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    field: 'id_quotation',
    references: {
      model: QUOTATION_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
};

class QuotationsDetails extends Model {
  static associate(models) {
    this.belongsTo(models.Products, {
      as: 'products',
      foreignKey: 'idProduct',
    });
    this.belongsTo(models.Quotation, {
      as: 'quotation',
      foreignKey: 'idQuotation',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: QUOTATIONS_DETAILS_TABLE,
      modelName: 'QuotationsDetails',
      timestamps: false,
    };
  }
}

module.exports = {
  QUOTATIONS_DETAILS_TABLE,
  quotationsDetailsSchema,
  QuotationsDetails,
};
