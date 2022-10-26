const {Model, DataTypes} = require('sequelize');

const BRANDS_TABLE = 'brands';

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
    },
    status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        unique: false,
        defaultValue: true,
      }
}

class Brands extends Model{
    static associate(models){
        this.hasMany(models.Vehicles, {
            as: 'vehicles_brands',
            foreignKey : 'id_brand'
        })
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