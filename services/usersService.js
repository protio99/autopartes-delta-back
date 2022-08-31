
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class UsersService {
  constructor() {
  
  }

  async create(data) {
    const newUser = await models.Users.create(data);
    return newUser;
  }


   async find() {
  
    const rta = await models.Users.findAll();
    return rta;

  }

  async findById(id) {
    const user = await models.Users.findByPk(id);
    if(!user){
      throw boom.notFound('user not found')
    }
    return user;
  }

  async update(id, newData) {
    const user = await this.findById(id);
    const rta = await user.update(newData);  
    return rta;
  }

  async delete(id) {
    const user = await this.findById(id);
    await user.destroy();  
    return {id};
  }
}

module.exports = UsersService;
