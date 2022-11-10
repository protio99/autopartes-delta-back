const {Model, DataTypes} = require('sequelize');

const PRODUCTS_BRANDS_TABLE = 'products_brands';

//DEFINE LA ESTRUCTURA DE LA BD
const productsBrandsSchema = {
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

class ProductsBrands extends Model{
    static associate(models){
        this.hasMany(models.Products, {
            as: 'products',
            foreignKey : 'idProduct'
        })
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: PRODUCTS_BRANDS_TABLE,
            modelName: 'ProductsBrands',
            timestamps: false


        })

    }
}

module.exports = {PRODUCTS_BRANDS_TABLE, productsBrandsSchema, ProductsBrands}