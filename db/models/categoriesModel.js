const {Model, DataTypes, Sequelize} = require('sequelize');

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
    },
    campo_prueba_migracion: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    }
}

class Categories extends Model{
    static associate(){
        //associate
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