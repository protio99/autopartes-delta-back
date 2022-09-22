const {Model, DataTypes} = require('sequelize');

const PERMISSIONS_TABLE = 'permissions';
const MODULES_TABLE = require ('../models/modulesModel')
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
        field: 'id_module',
        references: {
            model: MODULES_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: false,
    }
}

class Permissions extends Model{
    static associate(models){
        this.belongsTo(models.Modules, {
            as:'modules_permissions',
            foreignKey: 'idModule'});
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