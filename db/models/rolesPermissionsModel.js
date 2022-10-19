const {Model, DataTypes} = require('sequelize');
const {ROLES_TABLE} = require('./../models/rolesModel');
const {PERMISSIONS_TABLE} = require('./../models/permissionsModel');


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
        field: 'id_rol',
        references: {
            model: ROLES_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    idPermissions: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_permissions',
        references: {
            model: PERMISSIONS_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}

class RolesPermissions extends Model{
    static associate(models){
        
        // this.belongsTo(models.Permissions, {
        //     as:'permissions',
        //     foreignKey: 'idPermissions'});
        
        //     this.belongsTo(models.Roles, {
        //     as:'roles',
        //     foreignKey: 'idRol'})
        this.belongsTo(models.Permissions, {
            as: 'permissions',
            foreignKey: 'idPermissions',
          });
          this.belongsTo(models.Roles, {
            as: 'roles',
            foreignKey: 'idRol',
          });
        
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
