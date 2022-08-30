const {Model, DataTypes} = require('sequelize');

const BRANDS_TABLE = 'categories';

//DEFINE LA ESTRUCTURA DE LA BD
const brandsSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: true,
    }
}

class Brands extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: BRANDS_TABLE,
            modelName: 'Brands',
            timestamps: false


        })

    }
}

module.exports = {BRANDS_TABLE, brandsSchema, Brands}