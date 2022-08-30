const {Model, DataTypes} = require('sequelize');

const ORDERS_TABLE = 'orders';

//DEFINE LA ESTRUCTURA DE LA BD
const ordersSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idUser: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_user'
    },
    total: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
    }
}

class Orders extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: ORDERS_TABLE,
            modelName: 'Orders',
            timestamps: false


        })

    }
}

module.exports = {ORDERS_TABLE, ordersSchema, Orders}