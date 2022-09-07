const {Model, DataTypes} = require('sequelize');
const { USERS_TABLE } = require('./../models/usersModel');
const QUOTATION_TABLE = 'quotations';


//DEFINE LA ESTRUCTURA DE LA BD
const quotationSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idUser: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        field: 'id_user',
        references: {
            model: USERS_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    total:{
        type: DataTypes.VIRTUAL,
        get(){
            if (this.products.length > 0) {
                return this.products.reduce((total, product) =>{
                    return total + (product.price * product.ProductsQuotations.amount)
                },0)
            }
            return 0;

        }
    }
}

class Quotation extends Model{
    static associate(models){
        this.belongsTo(models.Users, {
            as:'user',
            foreignKey: 'idUser'});
        this.belongsToMany(models.Products, {
            as: 'products',
            through: models.ProductsQuotations,
            foreignKey: 'idQuotation',
            otherKey: 'idProduct'
        })
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: QUOTATION_TABLE,
            modelName: 'Quotation',
            timestamps: false


        })

    }
}

module.exports = {QUOTATION_TABLE, quotationSchema, Quotation}