const {Model, DataTypes} = require('sequelize');
const { PRODUCTS_TABLE } = require('./productsModel');
const { SALES_TABLE } = require('./salesModel');

const ORDERS_DETAILS_TABLE = 'orders_details';

//DEFINE LA ESTRUCTURA DE LA BD
const ordersDetailsSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idOrder: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        field: 'id_order',
        references: {
            model: SALES_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    idProduct: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_product',
        references: {
            model: PRODUCTS_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
    },
    price: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
    },
    iva: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
    },
    otherTaxes: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
        field: 'other_taxes'
    }
}

class OrdersDetails extends Model{
    static associate(models){
        this.belongsTo(models.Orders, {
            as: 'orders',
            foreignKey: 'idOrder',
          });
          this.belongsTo(models.Products, {
            as: 'products',
            foreignKey: 'idProduct',
          });
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: ORDERS_DETAILS_TABLE,
            modelName: 'OrdersDetails',
            timestamps: false


        })

    }
}

module.exports = {ORDERS_DETAILS_TABLE, ordersDetailsSchema, OrdersDetails}