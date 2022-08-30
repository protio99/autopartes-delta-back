const {Model, DataTypes, Sequelize} = require('sequelize');

const VEHICLES_TABLE = 'vehicles';

//DEFINE LA ESTRUCTURA DE LA BD
const vehiclesSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    idBrand: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_brand'
    }
}

class Vehicles extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: VEHICLES_TABLE,
            modelName: 'Vehicles',
            timestamps: false


        })

    }
}

module.exports = {VEHICLES_TABLE, vehiclesSchema, Vehicles}
