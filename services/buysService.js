
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class BuysService {
  constructor() {
  
  }

  async create(data) {
    const newBuy = await models.Buys.create(data);
    return newBuy;
  }


   async find() {
  
    const rta = await models.Buys.findAll();
    return rta;

  }

  async findById(id) {
    const buy = await models.Buys.findByPk(id);
    if(!buy){
      throw boom.notFound('buy not found')
    }
    return buy;
  }

  async update(id, newData) {
    const buy = await this.findById(id);
    const rta = await buy.update(newData);  
    return rta;
  }

  async delete(id) {
    const buy = await this.findById(id);
    await buy.destroy();  
    return {id};
  }
}

module.exports = BuysService;
