//ESTE ARCHIVO SE ENCARGA DE ENVIAR LA CONEXION HACIA LOS MODELOS

const {Categories, categoriesSchema} = require('./categoriesModel');

function setupModels(sequelize) {
    Categories.init(categoriesSchema, Categories.config(sequelize));
    
}

module.exports = setupModels;
