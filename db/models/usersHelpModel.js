const {Model, DataTypes} = require('sequelize');

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
        unique: false,
        fiel: 'id_module',
    },
      videoURL: {
        allowNull: false,
        unique: false,
        fiel: 'video_url',
        type: DataTypes.STRING
    }

}

class UsersHelp extends Model{
    static associate(){
        //associate
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
