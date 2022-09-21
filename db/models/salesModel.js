const { Model, DataTypes } = require('sequelize');
const { CLIENTS_TABLE } = require('./clientsModel');

const SALES_TABLE = 'sales';

//DEFINE LA ESTRUCTURA DE LA BD
const salesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  idClient: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    references: {
      model: CLIENTS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  saleDate: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.DATEONLY,
    unique: false,
    fiel: 'sale_date',
  },
  statusSale: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
    fiel: 'status_sale',
  },
  statusPayment: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
    fiel: 'status_payment',
  },
  totalPurchase: {
    allowNull: false,
    type: DataTypes.FLOAT,
    unique: false,
    fiel: 'total_purchase',
  },
};

class Sales extends Model {
  static associate(models) {
    this.belongsTo(models.Clients, {
      foreignKey: 'id',
      as: 'clients',
    });
    this.hasMany(models.SalesDetails, {
      as: 'buy_detail',
      foreignKey: 'idSale',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SALES_TABLE,
      modelName: 'Sales',
      timestamps: false,
    };
  }
}

module.exports = { SALES_TABLE, salesSchema, Sales };
