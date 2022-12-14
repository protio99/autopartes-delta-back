const { Model, DataTypes } = require('sequelize');
const { CATEGORIES_TABLE } = require('./categoriesModel');
const { PRODUCTS_BRANDS_TABLE } = require('./productsBrandsModel');

const PRODUCTS_TABLE = 'products';
//DEFINE LA ESTRUCTURA DE LA BD
const productsSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    unique: true,
    type: DataTypes.STRING(25),
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
  idBrand: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    field: 'id_brand',
    references: {
      model: PRODUCTS_BRANDS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
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
    type: DataTypes.STRING(5000),
    unique: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    unique: false,
    defaultValue: 1,
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
    this.belongsTo(models.ProductsBrands, {
      as: 'brand',
      foreignKey: 'idBrand',
    });
    this.hasMany(models.ImagesProducts, {
      as: 'images_products',
      foreignKey: 'idProduct',
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
    this.hasMany(models.ProductsVehicles, {
      as: 'products_vehicles',
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
