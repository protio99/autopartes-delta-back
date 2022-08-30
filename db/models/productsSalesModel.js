const {Model, DataTypes} = require('sequelize');

const PRODUCTS_SALES_TABLE = 'products_sales';

//DEFINE LA ESTRUCTURA DE LA BD
const productsSalesSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idSale: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        field: 'id_sale'
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
    otherTaxes: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
        field: 'other_taxes'
    }
}

class ProductsSales extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: PRODUCTS_SALES_TABLE,
            modelName: 'ProductsSales',
            timestamps: false


        })

    }
}

module.exports = {PRODUCTS_SALES_TABLE, productsSalesSchema, ProductsSales}