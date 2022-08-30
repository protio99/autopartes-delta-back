const {Model, DataTypes} = require('sequelize');

const PERMISSIONS_TABLE = 'permissions';

//DEFINE LA ESTRUCTURA DE LA BD
const permissionsSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idModule: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_module'
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: false,
    }
}

class Permissions extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: PERMISSIONS_TABLE,
            modelName: 'Permissions',
            timestamps: false


        })

    }
}

module.exports = {PERMISSIONS_TABLE, permissionsSchema, Permissions}