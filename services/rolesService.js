
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class RolesService {
  constructor() {
  
  }

  async create(data) {
    const newRole = await models.Roles.create(data);
    return newRole;
  }


   async find() {
  
    const rta = await models.Roles.findAll();
    return rta;

  }
  async permissionsByIdRol(idRol) { 
    const rta = await models.RolesPermissions.findAll({
      where:{
        idRol: idRol
      }
    });
    if (!rta) {
      throw boom.notFound('role not found')
      
    }
    return rta;

  }
  async findByName(rolName) { 
    const rta = await models.Roles.findAll({
      where:{
        name: rolName
      }
    });
    if (!rta) {
      throw boom.notFound('role not found')
      
    }
    return rta;

  }
  async findById(id) {
    const role = await models.Roles.findByPk(id);
    if(!role){
      throw boom.notFound('role not found')
    }
    return role;
  }

  async update(id, newData) {
    const role = await this.findById(id);
    const rta = await role.update(newData);  
    return rta;
  }

  async delete(id) {
    const role = await this.findById(id);
    await role.destroy();  
    return {id};
  }
}

module.exports = RolesService;
