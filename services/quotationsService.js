
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class QuotationsService {
  constructor() {
  
  }

  async create(data) {
    const newQuotation = await models.Quotation.create(data);
    return newQuotation;
  }
  async addProduct(data) {
    const newProduct = await models.ProductsQuotations.create(data);
    return newProduct;
  }

   async find() {
  
    const rta = await models.Quotation.findAll({
      include: ['user','products']
    });
    return rta;

  }

  async findById(id) {
    const quotation = await models.Quotation.findByPk(id);
    if(!quotation){
      throw boom.notFound('Quotation not found')
    }
    return quotation;
  }

  async update(id, newData) {
    const quotation = await this.findById(id);
    const rta = await quotation.update(newData);  
    return rta;
  }

  async delete(id) {
    const quotation = await this.findById(id);
    await quotation.destroy();  
    return {id};
  }
}

module.exports = QuotationsService;
