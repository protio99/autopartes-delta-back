const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class ProductsBrandsService {
  constructor() {
  
  }

  async create(data) {
    const newProductsBrands = await models.ProductsBrands.create(data);
    return newProductsBrands;
  }


   async find() {
  
    const rta = await models.ProductsBrands.findAll();
    return rta;

  }

  async findById(id) {
    const productsbrands = await models.ProductsBrands.findByPk(id);
    if(!productsbrands){
      throw boom.notFound('productsbrands not found')
    }
    return productsbrands;
  }

  async update(id, newData) {
    const productsbrands = await this.findById(id);
    const rta = await productsbrands.update(newData);  
    return rta;
  }

  async delete(id) {
    const productsbrands = await this.findById(id);
    await productsbrands.destroy();  
    return {id};
  }
}

module.exports = ProductsBrandsService;
