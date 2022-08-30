const {Model, DataTypes} = require('sequelize');

const PRODUCTS_VEHICLES_TABLE = 'products_vehicles';

//DEFINE LA ESTRUCTURA DE LA BD
const productsVehiclesSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idBrand: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_brand'
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: false,
    },
    model: {
        allowNull: false,
        type: DataTypes.STRING(5),
        unique: false,
    }
}

class ProductsVehicles extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: PRODUCTS_VEHICLES_TABLE,
            modelName: 'ProductsVehicles',
            timestamps: false


        })

    }
}

module.exports = {PRODUCTS_VEHICLES_TABLE, productsVehiclesSchema, ProductsVehicles}