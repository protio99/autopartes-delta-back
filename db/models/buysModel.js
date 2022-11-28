const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROVIDERS_TABLE } = require('./providersModel');

const BUYS_TABLE = 'buys';

//DEFINE LA ESTRUCTURA DE LA BD
const buysSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING(30),
  },
  idProvider: {
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: false,
    field: 'id_provider',
    references: {
      model: PROVIDERS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  datePurchase: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'date_purchase',
    unique: false,
    
  },
  totalPurchase: {
    allowNull: false,
    type: DataTypes.FLOAT,
    unique: false,
    field: 'total_purchase',
  },
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    unique: false,
    defaultValue: true,
  },
  invoiceUrl: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: false,
    field: 'invoice_url',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.NOW,
    field: 'created_at',
    unique: false,
  },
  reason: {
    allowNull: true,
    type: DataTypes.STRING(500),
    unique: false,
  }
};

class Buys extends Model {
  static associate(models) {
    this.belongsTo(models.Providers, {
      as: 'provider',
      foreignKey: 'idProvider',
    });
    this.hasMany(models.BuysDetails, {
      as: 'buy_detail',
      foreignKey: 'idBuy',
    });
    this.hasMany(models.FilesBuys, {
      as: 'files_buys',
      foreignKey: 'idBuy',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BUYS_TABLE,
      modelName: 'Buys',
      timestamps: false,
    };
  }
}

module.exports = { BUYS_TABLE, buysSchema, Buys };
