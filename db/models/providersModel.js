const {Model, DataTypes} = require('sequelize');

const PROVIDERS_TABLE = 'providers';

//DEFINE LA ESTRUCTURA DE LA BD
const providersSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nit: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    companyName: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
        field: 'company_name'
    },
    contactName: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
        field:'contact_name'
    },
    telephone: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    adress: {
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
    status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        unique: false,
        defaultValue: true,
      }

}

class Providers extends Model{
    static associate(models){
        this.hasMany(models.Buys, {
            as: 'buys',
            foreignKey : 'idProvider'
        })
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: PROVIDERS_TABLE,
            modelName: 'Providers',
            timestamps: false


        })

    }
}

module.exports = {PROVIDERS_TABLE, providersSchema, Providers}
