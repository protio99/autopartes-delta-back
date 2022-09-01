const {Model, DataTypes} = require('sequelize');
const {MODULES_TABLE} = require('./modulesModel')

const USERS_HELP_TABLE = 'users_help';

//DEFINE LA ESTRUCTURA DE LA BD
const usersHelpSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
      idModule: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_module',
        references: {
            model: MODULES_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
      videoURL: {
        allowNull: false,
        unique: false,
        field: 'video_url',
        type: DataTypes.STRING
    }

}

class UsersHelp extends Model{
    static associate(models){
        this.belongsTo(models.Modules, {as:'modules'})
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: USERS_HELP_TABLE,
            modelName: 'UsersHelp',
            timestamps: false


        })

    }
}

module.exports = {USERS_HELP_TABLE, usersHelpSchema, UsersHelp}
