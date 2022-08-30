const {Model, DataTypes} = require('sequelize');

const BUYS_DETAILS_TABLE = 'buys_details';

//DEFINE LA ESTRUCTURA DE LA BD
const buysDetailsSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idBuy: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_buy'
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
    othersTaxes: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
    }
}

class BuysDetails extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: BUYS_DETAILS_TABLE,
            modelName: 'BuysDetails',
            timestamps: false


        })

    }
}

module.exports = {BUYS_DETAILS_TABLE, buysDetailsSchema, BuysDetails}