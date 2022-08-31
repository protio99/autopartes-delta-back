
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class SalesService {
  constructor() {
  
  }

  async create(data) {
    const newSale = await models.Sales.create(data);
    return newSale;
  }


   async find() {
  
    const rta = await models.Sales.findAll();
    return rta;

  }

  async findById(id) {
    const sale = await models.Sales.findByPk(id);
    if(!sale){
      throw boom.notFound('sale not found')
    }
    return sale;
  }

  async update(id, newData) {
    const sale = await this.findById(id);
    const rta = await sale.update(newData);  
    return rta;
  }

  async delete(id) {
    const sale = await this.findById(id);
    await sale.destroy();  
    return {id};
  }
}

module.exports = SalesService;
