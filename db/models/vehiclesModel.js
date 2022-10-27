const { Model, DataTypes } = require('sequelize');

const VEHICLES_TABLE = 'vehicles';
const { BRANDS_TABLE } = require('./../models/brandsModel');
//DEFINE LA ESTRUCTURA DE LA BD
const vehiclesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
  },
  model: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: false,
  },
  idBrand: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    field: 'id_brand',
    references: {
      model: BRANDS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  status: {
    type: DataTypes.BOOLEAN,
    unique: false,
    defaultValue: 1,
  },
};

class Vehicles extends Model {
  static associate(models) {
    this.belongsTo(models.Brands, {
      as: 'brands_vehicles',
      foreignKey: 'idBrand',
    });
    this.hasMany(models.ProductsVehicles, {
        as: 'vehicles_products',
        foreignKey: 'idVehicle',
      });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VEHICLES_TABLE,
      modelName: 'Vehicles',
      timestamps: false,
    };
  }
}

module.exports = { VEHICLES_TABLE, vehiclesSchema, Vehicles };
