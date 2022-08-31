
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class BuysDetailsService {
  constructor() {
  
  }

  async create(data) {
    const newBuyDetailService = await models.BuysDetails.create(data);
    return newBuyDetailService;
  }


   async find() {
  
    const rta = await models.BuysDetails.findAll();
    return rta;

  }

  async findById(id) {
    const buyDetail = await models.BuysDetails.findByPk(id);
    if(!buyDetail){
      throw boom.notFound('Buy detail not found')
    }
    return buyDetail;
  }

  async update(id, newData) {
    const buyDetail = await this.findById(id);
    const rta = await buyDetail.update(newData);  
    return rta;
  }

  async delete(id) {
    const buyDetail = await this.findById(id);
    await buyDetail.destroy();  
    return {id};
  }
}

module.exports = BuysDetailsService;
