const {Model, DataTypes} = require('sequelize');

const CATEGORIES_TABLE = 'categories';

//DEFINE LA ESTRUCTURA DE LA BD
const categoriesSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    }
}

class Categories extends Model{
    static associate(models){
        this.hasMany(models.Products, {
            as: 'products_categories',
            foreignKey : 'idCategory'
        })
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: CATEGORIES_TABLE,
            modelName: 'Categories',
            timestamps: false


        })

    }
}

module.exports = {CATEGORIES_TABLE, categoriesSchema, Categories}