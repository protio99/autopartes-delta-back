
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class ProductsVehiclesService {
  constructor() {
  
  }

  async create(data) {
    const newProductVehicle = await models.ProductsVehicles.create(data);
    return newProductVehicle;
  }


   async find() {
  
    const rta = await models.ProductsVehicles.findAll();
    return rta;

  }

  async findById(id) {
    const productVehicle = await models.ProductsVehicles.findByPk(id);
    if(!productVehicle){
      throw boom.notFound('product vehicle not found')
    }
    return productVehicle;
  }

  async update(id, newData) {
    const productVehicle = await this.findById(id);
    const rta = await productVehicle.update(newData);  
    return rta;
  }

  async delete(id) {
    const productVehicle = await this.findById(id);
    await productVehicle.destroy();  
    return {id};
  }
}

module.exports = ProductsVehiclesService;
