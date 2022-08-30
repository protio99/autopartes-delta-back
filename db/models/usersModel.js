const {Model, DataTypes} = require('sequelize');

const USERS_TABLE = 'users';

//DEFINE LA ESTRUCTURA DE LA BD
const usersSchema = {
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
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        unique: false,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    lastname: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    dateTime: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        unique: false,
    }
}

class Users extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: USERS_TABLE,
            modelName: 'Users',
            timestamps: false


        })

    }
}

module.exports = {USERS_TABLE, usersSchema, Users}
