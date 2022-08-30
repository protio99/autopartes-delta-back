const {Model, DataTypes} = require('sequelize');

const BUYS_TABLE = 'buys';

//DEFINE LA ESTRUCTURA DE LA BD
const buysSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idProvider: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_provider'
    },
    date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'date_purchase',
        unique: false,
        defaultValue: DataTypes.NOW
    },
    invoiceNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    totalPurchase: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
    },
    totalIva: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
    },
    totalOtherTaxes: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
    },
    total: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
    },
    status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        unique: false,
        defaultValue: false
    }
}

class Buys extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: BUYS_TABLE,
            modelName: 'Buys',
            timestamps: false


        })

    }
}

module.exports = {BUYS_TABLE, buysSchema, Buys}