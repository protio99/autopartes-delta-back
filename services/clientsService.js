
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class ClientsService {
  constructor() {
  
  }

  async create(data) {
    const newClient = await models.Clients.create(data);
    return newClient;
  }


   async find() {
  
    const rta = await models.Clients.findAll();
    return rta;

  }

  async findById(id) {
    const client = await models.Clients.findByPk(id);
    if(!client){
      throw boom.notFound('client not found')
    }
    return client;
  }

  async update(id, newData) {
    const client = await this.findById(id);
    const rta = await client.update(newData);  
    return rta;
  }

  async delete(id) {
    const client = await this.findById(id);
    await client.destroy();  
    return {id};
  }
}

module.exports = ClientsService;
