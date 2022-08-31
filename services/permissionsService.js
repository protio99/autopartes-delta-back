
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class PermissionsService {
  constructor() {
  
  }

  async create(data) {
    const newPermission = await models.Permissions.create(data);
    return newPermission;
  }


   async find() {
  
    const rta = await models.Permissions.findAll();
    return rta;

  }

  async findById(id) {
    const permission = await models.Permissions.findByPk(id);
    if(!permission){
      throw boom.notFound('permission not found')
    }
    return permission;
  }

  async update(id, newData) {
    const permission = await this.findById(id);
    const rta = await permission.update(newData);  
    return rta;
  }

  async delete(id) {
    const permission = await this.findById(id);
    await permission.destroy();  
    return {id};
  }
}

module.exports = PermissionsService;
