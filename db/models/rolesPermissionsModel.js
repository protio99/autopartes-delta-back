const {Model, DataTypes} = require('sequelize');

const ROLES_PERMISSIONS_TABLE = 'roles_permisions';

//DEFINE LA ESTRUCTURA DE LA BD
const rolesPermissionsSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idRol: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_rol'
    },
    idPermissions: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_permissions'
    }
}

class RolesPermissions extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: ROLES_PERMISSIONS_TABLE,
            modelName: 'RolesPermissions',
            timestamps: false


        })

    }
}

module.exports = {ROLES_PERMISSIONS_TABLE, rolesPermissionsSchema, RolesPermissions}
