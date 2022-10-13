const {Model, DataTypes} = require('sequelize');
const {PRODUCTS_TABLE} = require('./productsModel');

const IMAGES_PRODUCTS_TABLE = 'images_products';

//DEFINE LA ESTRUCTURA DE LA BD
const imagesProductsSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idProduct: {
        allowNull: false,
        type: DataTypes.STRING(25),
        unique: false,
        field: 'id_product',
        references: {
          model: PRODUCTS_TABLE,
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

class ImagesProducts extends Model{
    static associate(models){
        this.belongsTo(models.Products, {
            as: 'products',
            foreignKey: 'idProduct',
          });
    }

    static config(sequelize){
        return({
            sequelize,
            tableName: IMAGES_PRODUCTS_TABLE,
            modelName: 'ImagesProducts',
            timestamps: false


        })

    }
}

module.exports = {IMAGES_PRODUCTS_TABLE, imagesProductsSchema, ImagesProducts}