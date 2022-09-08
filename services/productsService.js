
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')
const { Op } = require('sequelize');



class ProductsService {
  constructor() {
  
  }

  async create(data) {
    const newProduct = await models.Products.create(data);
    return newProduct;
  }


   async find(query) {
    const options = {
      include: [ {
        association: 'vehicle',
        include: ['brands_vehicles']
      }, 'category'],
      where: {},
    };
    const {limit, offset, price, priceMin, priceMax} = query;
    
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    if (price) {
      options.where.price = price;
      
    }
    if (priceMin && priceMax) {
      options.where.price = {
        [Op.between]: [priceMin,priceMax]
      }
      
    }

    const rta = await models.Products.findAll(options);
    return rta;

  }

  async findById(id) {
    const product = await models.Products.findByPk(id);
    if(!product){
      throw boom.notFound('product not found')
    }
    return product;
  }

  async update(id, newData) {
    const product = await this.findById(id);
    const rta = await product.update(newData);  
    return rta;
  }

  async delete(id) {
    const product = await this.findById(id);
    await product.destroy();  
    return {id};
  }
}

module.exports = ProductsService;
