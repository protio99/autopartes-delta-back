const {Model, DataTypes} = require('sequelize');

const DETAILS_PRODUCTS_ORDERS_TABLE = 'details_products_orders';

//DEFINE LA ESTRUCTURA DE LA BD
const detailsProductsOrdersSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idProduct: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_product'
    },
    amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        
    },
    idOrder: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_order'
    }
    
}

class DetailsProductsOrders extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: DETAILS_PRODUCTS_ORDERS_TABLE,
            modelName: 'DetailsProductsOrders',
            timestamps: false


        })

    }
}

module.exports = {DETAILS_PRODUCTS_ORDERS_TABLE, detailsProductsOrdersSchema, DetailsProductsOrders}