const {Model, DataTypes} = require('sequelize');

const SALES_TABLE = 'sales';

//DEFINE LA ESTRUCTURA DE LA BD
const salesSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idClient: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
    },
    saleDate: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
        fiel: 'sale_date',
    },
    statusSale: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
        fiel: 'satus_sale',
    },
    statusPayment: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
        fiel: 'satus_payment',
    },
    totalPurchase: {
      allowNull: false,
      type: DataTypes.FLOAT,
      unique: false,
      fiel: 'total_purchase',
  }

}

class Sales extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: SALES_TABLE,
            modelName: 'Sales',
            timestamps: false


        })

    }
}

module.exports = {SALES_TABLE, salesSchema, Sales}