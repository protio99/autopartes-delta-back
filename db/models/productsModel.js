const {Model, DataTypes} = require('sequelize');

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
        field: 'id_category'
    },
    idBrand: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_brand'
    },
    idVehicle: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_vehicle'
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
    static associate(){
        //associate
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