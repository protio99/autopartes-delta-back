
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class ProvidersService {
  constructor() {
  
  }

  async create(data) {
    const newProvider = await models.Providers.create(data);
    return newProvider;
  }


   async find() {
  
    const rta = await models.Providers.findAll();
    return rta;

  }

  async findById(id) {
    const provider = await models.Providers.findByPk(id);
    if(!provider){
      throw boom.notFound('provider not found')
    }
    return provider;
  }

  async update(id, newData) {
    const provider = await this.findById(id);
    const rta = await provider.update(newData);  
    return rta;
  }

  async delete(id) {
    const provider = await this.findById(id);
    await provider.destroy();  
    return {id};
  }
}

module.exports = ProvidersService;
