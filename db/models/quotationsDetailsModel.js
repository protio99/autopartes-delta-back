const { Model, DataTypes } = require('sequelize');
const { PRODUCTS_TABLE } = require('./productsModel');
const QUOTATIONS_DETAILS_TABLE = 'quotations_details';
const { USERS_TABLE } = require('./../models/usersModel');
//DEFINE LA ESTRUCTURA DE LA BD
const quotationsDetailsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  idUser: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    field: 'id_user',
    references: {
        model: USERS_TABLE,
        key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
},
  idProduct: {
    allowNull: false, 
    type: DataTypes.STRING(25),
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
};

class QuotationsDetails extends Model {
  static associate(models) {
    this.belongsTo(models.Products, {
      as: 'products',
      foreignKey: 'idProduct',
    });
    this.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'idUser',
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
