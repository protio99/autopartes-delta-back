const boom = require('@hapi/boom');
const { models } = require('../librerias/sequelize');
const RolesPermissionsService = require('./rolesPermissionsService');

const _rolesPermissionsService = new RolesPermissionsService();
class RolesService {
  constructor() {}

  async create(name, modulesSelected) {
    const data = {
      name: name,
    };
    const newRol = await models.Roles.create(data);
    const idRol = newRol.dataValues.id;

    modulesSelected.forEach(async (module) => {
      const data = {
        idRol: idRol,
        idModule: module.id,
      };
      await _rolesPermissionsService.create(data);
    });

    return newRol;
  }
  async update(id, name, selectedModules) {
    const role = await this.findById(id);
    if (!role) {
      throw boom.badData('Verifique los datos enviados del rol');
    }
    const currentPermissions = await models.RolesPermissions.findAll({
      where: {
        idRol: id,
      },
    });
    currentPermissions.forEach(async (permission) => {
      await permission.destroy();
    });

    selectedModules.forEach(async (newPermission) => {
      await models.RolesPermissions.create({
        idRol: id,
        idModule: newPermission.id,
      });
    });
    const rta = await role.update({ name });
    return rta;
  }

  async updateStatus(id, newStatus) {
    console.log('fdsdf', newStatus);
    const rol = await models.Roles.findByPk(id);
    if (!rol) {
      throw boom.notFound('No se encontro un rol con ese id');
    }
    const user = await models.Users.findAll({
      where: {
        idRol: id,
      },
    });

    if (user.length) {
      throw boom.unauthorized('Este rol tiene usuarios asociados');
    }
    const rta = await rol.update({
      status: newStatus,
    });
    return rta;
  }
  async find() {
    const rta = await models.Roles.findAll();
    return rta;
  }
  async permissionsByIdRol(idRol) {
    const rta = await models.RolesPermissions.findAll({
      where: {
        idRol: idRol,
      },
    });
    if (!rta) {
      throw boom.notFound('role not found');
    }
    return rta;
  }
  async findByName(rolName) {
    const rta = await models.Roles.findAll({
      where: {
        name: rolName,
      },
    });
    if (!rta) {
      throw boom.notFound('role not found');
    }
    return rta;
  }
  async findById(id) {
    const role = await models.Roles.findByPk(id);
    if (!role) {
      throw boom.notFound('role not found');
    }
    return role;
  }

  async delete(id) {
    const role = await this.findById(id);
    await role.destroy();
    return { id };
  }
}

module.exports = RolesService;
