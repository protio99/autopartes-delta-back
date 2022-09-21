const { Model, DataTypes } = require('sequelize');
const { CATEGORIES_TABLE } = require('./categoriesModel');
const { VEHICLES_TABLE } = require('./../models/vehiclesModel');

const PRODUCTS_TABLE = 'products';
//DEFINE LA ESTRUCTURA DE LA BD
const productsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  idCategory: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    field: 'id_category',
    references: {
      model: CATEGORIES_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  idVehicle: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    field: 'id_vehicle',
    references: {
      model: VEHICLES_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  photo: {
    type: DataTypes.STRING(200),
    unique: false,
    defaultValue: 'enlace no proporcionado',
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(50),
    unique: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    unique: false,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.FLOAT,
    unique: false,
    defaultValue: 0,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING(500),
    unique: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    unique: false,
    defaultValue: 0,
  },
  iva: {
    type: DataTypes.FLOAT,
    unique: false,
    defaultValue: 0,
  },
};

class Products extends Model {
  static associate(models) {
    this.belongsTo(models.Categories, {
      as: 'category',
      foreignKey: 'idCategory',
    });

    this.belongsTo(models.Vehicles, {
      as: 'vehicle',
      foreignKey: 'idVehicle',
    });
    this.hasMany(models.SalesDetails, {
      as: 'sale_detail',
      foreignKey: 'idProduct',
    });
    this.hasMany(models.QuotationsDetails, {
      as: 'quotation_detail',
      foreignKey: 'idProduct',
    });
    this.hasMany(models.BuysDetails, {
      as: 'buys_detail',
      foreignKey: 'idProduct',
    });
    this.hasMany(models.OrdersDetails, {
      as: 'orders_detail',
      foreignKey: 'idProduct',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: 'Products',
      timestamps: false,
    };
  }
}

module.exports = { PRODUCTS_TABLE, productsSchema, Products };
