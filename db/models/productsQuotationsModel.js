const {Model, DataTypes} = require('sequelize');
const {PRODUCTS_TABLE} = require('./../models/productsModel');
const {QUOTATION_TABLE} = require('./../models/quotationModel');
const PRODUCTS_QUOTATIONS_TABLE = 'products_quotations';

//DEFINE LA ESTRUCTURA DE LA BD
const productsQuotationsSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idProduct: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_product',
        references: {
            model: PRODUCTS_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    idQuotation: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_quotation',
        references: {
            model: QUOTATION_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },

    amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
                
    },
    
}

class ProductsQuotations extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: PRODUCTS_QUOTATIONS_TABLE,
            modelName: 'ProductsQuotations',
            timestamps: false


        })

    }
}

module.exports = {PRODUCTS_QUOTATIONS_TABLE, productsQuotationsSchema, ProductsQuotations}