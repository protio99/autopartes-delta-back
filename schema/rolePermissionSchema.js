const Joi = require('joi');

const id = Joi.number().integer().positive();
const idRol = Joi.number().integer().positive();
const idPermissions = Joi.number().integer().positive();

const createRolePermissionSchema = Joi.object({
  idRol: idRol.required(),
  idPermissions: idPermissions.required(),

});

const updateRolePermissionSchema = Joi.object({
  idRol,
  idPermissions,
});

const getRolePermissionSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createRolePermissionSchema,
  updateRolePermissionSchema,
  getRolePermissionSchema,
};
