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
    field: 'id_client',
  },
  saleDate: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.DATEONLY,
    unique: false,
    field: 'sale_date',
  },
  statusSale: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
    field: 'status_sale',
  },
  statusPayment: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
    field: 'status_payment',
  },
  totalPurchase: {
    allowNull: false,
    type: DataTypes.FLOAT,
    unique: false,
    field: 'total_purchase',
  },
  typeSale: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    unique: false,
    field: 'type_sale',
  },
  reason: {
    allowNull: true,
    type: DataTypes.STRING(500),
    unique: false,
    defaultValue: null,
  },
};

class Sales extends Model {
  static associate(models) {
    this.belongsTo(models.Clients, {
      foreignKey: 'idClient',
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
