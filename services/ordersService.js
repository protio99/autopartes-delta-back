
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class OdersService {
  constructor() {
  
  }

  async create(data) {
    const newOder = await models.Oders.create(data);
    return newOder;
  }


   async find() {
  
    const rta = await models.Oders.findAll();
    return rta;

  }

  async findById(id) {
    const order = await models.Oders.findByPk(id);
    if(!order){
      throw boom.notFound('order not found')
    }
    return order;
  }

  async update(id, newData) {
    const order = await this.findById(id);
    const rta = await order.update(newData);  
    return rta;
  }

  async delete(id) {
    const order = await this.findById(id);
    await order.destroy();  
    return {id};
  }
}

module.exports = OdersService;
