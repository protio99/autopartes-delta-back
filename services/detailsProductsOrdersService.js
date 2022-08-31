
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class DetailsProductsOrdersService {
  constructor() {
  
  }

  async create(data) {
    const newDetailProductOrder = await models.DetailsProductsOrders.create(data);
    return newDetailProductOrder;
  }


   async find() {
  
    const rta = await models.DetailsProductsOrders.findAll();
    return rta;

  }

  async findById(id) {
    const detailProductOrder = await models.DetailsProductsOrders.findByPk(id);
    if(!detailProductOrder){
      throw boom.notFound('detail product order not found')
    }
    return detailProductOrder;
  }

  async update(id, newData) {
    const detailProductOrder = await this.findById(id);
    const rta = await detailProductOrder.update(newData);  
    return rta;
  }

  async delete(id) {
    const detailProductOrder = await this.findById(id);
    await detailProductOrder.destroy();  
    return {id};
  }
}

module.exports = DetailsProductsOrdersService;
