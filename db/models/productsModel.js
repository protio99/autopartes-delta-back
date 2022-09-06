const {Model, DataTypes} = require('sequelize');
const {CATEGORIES_TABLE} = require('./categoriesModel')
const {VEHICLES_TABLE} = require('./../models/vehiclesModel')

const PRODUCTS_TABLE = 'products';
//DEFINE LA ESTRUCTURA DE LA BD
const productsSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idCategory: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_category',
        references: {
            model: CATEGORIES_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },

    idVehicle: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_vehicle',
        references: {
            model: VEHICLES_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    photo: {
        allowNull: false,
        type: DataTypes.STRING(200),
        unique: false,
        
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: false,
        
    },
    amount: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: false,
        
    },
    price: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
        
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING(500),
        unique: false,
      
    },
    state: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        unique: false,
    
    },
    iva: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
        
    }
}

class Products extends Model{
    static associate(models){
        this.belongsTo(models.Categories, {
            as:'category',
            foreignKey: 'id'});
 
        this.belongsTo(models.Vehicles, {
            as:'vehicle',
            foreignKey: 'id'});    

    }

    static config(sequelize){
        return({
            sequelize,
            tableName: PRODUCTS_TABLE,
            modelName: 'Products',
            timestamps: false


        })

    }
}

module.exports = {PRODUCTS_TABLE, productsSchema, Products}