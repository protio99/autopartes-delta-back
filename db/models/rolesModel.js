const {Model, DataTypes} = require('sequelize');

const ROLES_TABLE = 'roles';

//DEFINE LA ESTRUCTURA DE LA BD
const rolesSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    creationDate: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
        field: 'creation_date'
    },
    status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        unique: false,
        defaultValue: false,
    }
}

class Roles extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: ROLES_TABLE,
            modelName: 'Roles',
            timestamps: false


        })

    }
}

module.exports = {ROLES_TABLE, rolesSchema, Roles}
