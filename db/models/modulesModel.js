const {Model, DataTypes} = require('sequelize');

const MODULES_TABLE = 'modules';

//DEFINE LA ESTRUCTURA DE LA BD
const modulesSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(20),
        unique: true,
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING(500),
        unique: false,
    }
}

class Modules extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: MODULES_TABLE,
            modelName: 'Modules',
            timestamps: false


        })

    }
}

module.exports = {MODULES_TABLE, modulesSchema, Modules}