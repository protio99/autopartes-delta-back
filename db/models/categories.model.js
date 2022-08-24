const {Model, DataTypes, Sequelize} = require('sequelize');

const CATEGORIES_TABLE = 'categories';
const categoriesSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    }
}

// class Categories extends Model{
//     static associate(){

//     }
// }