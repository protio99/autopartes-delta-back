
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class ProductsSalesService {
  constructor() {
  
  }

  async create(data) {
    const newProductSale = await models.ProductsSales.create(data);
    return newProductSale;
  }


   async find() {
  
    const rta = await models.ProductsSales.findAll();
    return rta;

  }

  async findById(id) {
    const productSale = await models.ProductsSales.findByPk(id);
    if(!productSale){
      throw boom.notFound('product sale not found')
    }
    return productSale;
  }

  async update(id, newData) {
    const productSale = await this.findById(id);
    const rta = await productSale.update(newData);  
    return rta;
  }

  async delete(id) {
    const productSale = await this.findById(id);
    await productSale.destroy();  
    return {id};
  }
}

module.exports = ProductsSalesService;
