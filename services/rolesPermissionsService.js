
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class RolesPermissionsService {
  constructor() {
  
  }

  async create(data) {
    const rolePermission = await models.RolesPermissions.create(data);
    return rolePermission;
  }


   async find() { 
    const rta = await models.RolesPermissions.findAll({
      include: ['permissions']
    });
    return rta;

  }

  async findById(id) {
    const rolePermission = await models.RolesPermissions.findByPk(id);
    if(!rolePermission){
      throw boom.notFound('role permission not found')
    }
    return rolePermission;
  }

  async update(id, newData) {
    const rolePermission = await this.findById(id);
    const rta = await rolePermission.update(newData);  
    return rta;
  }

  async delete(id) {
    const rolePermission = await this.findById(id);
    await rolePermission.destroy();  
    return {id};
  }

  async findPermissionsOfRolSelected(idRol){
    const options ={
      include: [
        {
          association: 'permissions',
          include: ['modules_permissions']
        }
      ],

      where:{
        idRol: idRol
      }
    };
    const permissionsOfRol = await models.RolesPermissions.findAll(options)
    return permissionsOfRol
  }
}



module.exports = RolesPermissionsService;
