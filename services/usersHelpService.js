
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class UserHelpsService {
  constructor() {
  
  }

  async create(data) {
    const newUserHelp = await models.UsersHelp.create(data);
    return newUserHelp;
  }


   async find() {
    const rta = await models.UsersHelp.findAll({
      include: ['modules']
    });
    return rta;

  }

  async findById(id) {
    const userHelp = await models.UsersHelp.findByPk(id);
    if(!userHelp){
      throw boom.notFound('user help not found')
    }
    return userHelp;
  }

  async update(id, newData) {
    const userHelp = await this.findById(id);
    const rta = await userHelp.update(newData);  
    return rta;
  }

  async delete(id) {
    const userHelp = await this.findById(id);
    await userHelp.destroy();  
    return {id};
  }
}

module.exports = UserHelpsService;
