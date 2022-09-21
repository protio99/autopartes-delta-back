const { Model, DataTypes } = require('sequelize');
const { CLIENTS_TABLE } = require('./clientsModel');

const ORDERS_TABLE = 'orders';

//DEFINE LA ESTRUCTURA DE LA BD
const ordersSchema = {
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

class Orders extends Model {
  static associate(models) {
    this.belongsTo(models.Clients, {
      foreignKey: 'idClient',
      as: 'clients',
    });
    this.hasMany(models.OrdersDetails, {
      as: 'order_detail',
      foreignKey: 'idOrder',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDERS_TABLE,
      modelName: 'Orders',
      timestamps: false,
    };
  }
}

module.exports = { ORDERS_TABLE, ordersSchema, Orders };
