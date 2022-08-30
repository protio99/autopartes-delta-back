const {Model, DataTypes} = require('sequelize');

const CLIENTS_TABLE = 'clients';

//DEFINE LA ESTRUCTURA DE LA BD
const clientsSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idUser: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_user'
    },
    lastname: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    documentType: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
        field: 'document_type'
    },
    document: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    telephone: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    department: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    city: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    neightboorhood: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    address: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    indications: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    }
}

class Clients extends Model{
    static associate(){
        //associate
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: CLIENTS_TABLE,
            modelName: 'clients',
            timestamps: false


        })

    }
}

module.exports = {CLIENTS_TABLE, clientsSchema, Clients}