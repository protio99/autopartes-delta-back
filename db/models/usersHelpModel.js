const {Model, DataTypes} = require('sequelize');

const USER_HELP_TABLE = 'user_help';

//DEFINE LA ESTRUCTURA DE LA BD
const userHelpSchema = {
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

class UserHelp extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: USER_HELP_TABLE,
            modelName: 'UserHelp',
            timestamps: false


        })

    }
}

module.exports = {USER_HELP_TABLE, userHelpSchema, UserHelp}
