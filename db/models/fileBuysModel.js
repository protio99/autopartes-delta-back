const {Model, DataTypes} = require('sequelize');
const {BUYS_TABLE} = require('./buysModel');

const FILE_BUYS_TABLE = 'files_buys';

//DEFINE LA ESTRUCTURA DE LA BD
const filesBuysSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idBuy: {
        allowNull: false,
        type: DataTypes.STRING(30),
        field: 'id_buy',
        references: {
          model: BUYS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    url: {
        allowNull: false,
        type: DataTypes.STRING(200),
    }
}

class FilesBuys extends Model{
    static associate(models){
        this.belongsTo(models.Buys, {
            as: 'buys',
            foreignKey: 'idBuy',
          });
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: FILE_BUYS_TABLE,
            modelName: 'FilesBuys',
            timestamps: false


        })

    }
}

module.exports = {FILE_BUYS_TABLE, filesBuysSchema, FilesBuys}