
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class ModulesService {
  constructor() {
  
  }

  async create(data) {
    const newModule = await models.Modules.create(data);
    return newModule;
  }


   async find() {
  
    const rta = await models.Modules.findAll();
    return rta;

  }

  async findById(id) {
    const module = await models.Modules.findByPk(id);
    if(!module){
      throw boom.notFound('module not found')
    }
    return module;
  }

  async update(id, newData) {
    const module = await this.findById(id);
    const rta = await module.update(newData);  
    return rta;
  }

  async delete(id) {
    const module = await this.findById(id);
    await module.destroy();  
    return {id};
  }
}

module.exports = ModulesService;
