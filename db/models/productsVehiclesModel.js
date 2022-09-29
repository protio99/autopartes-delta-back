const { Model, DataTypes } = require('sequelize');
const { VEHICLES_TABLE } = require('./vehiclesModel');
const { PRODUCTS_TABLE } = require('./vehiclesModel');

const PRODUCTS_VEHICLES_TABLE = 'products_vehicles';

//DEFINE LA ESTRUCTURA DE LA BD
const productsVehiclesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
};

class ProductsVehicles extends Model {
  static associate(models) {
    this.belongsTo(models.Products, {
      as: 'products',
      foreignKey: 'id_product',
    });
    this.belongsTo(models.Vehicles, {
      as: 'vehicles',
      foreignKey: 'id_vehicle',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_VEHICLES_TABLE,
      modelName: 'ProductsVehicles',
      timestamps: false,
    };
  }
}

module.exports = {
  PRODUCTS_VEHICLES_TABLE,
  productsVehiclesSchema,
  ProductsVehicles,
};
