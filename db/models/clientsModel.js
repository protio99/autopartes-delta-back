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
    name: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: false,
    },
    lastname: {
        allowNull: false,
        type: DataTypes.STRING(200),
        unique: false,
    },
    documentType: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: false,
        field: 'document_type'
    },
    document: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: false,
    },
    telephone: {
        allowNull: false,
        type: DataTypes.STRING(20),
        unique: false,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: false,
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: false,
    },
    department: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: false,
    },
    city: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: false,
    },
    neightboorhood: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: false,
    },
    address: {
        allowNull: false,
        type: DataTypes.STRING(200),
        unique: false,
    },
    indications: {
        allowNull: false,
        type: DataTypes.STRING(500),
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