const Joi = require('joi');

const id = Joi.number().integer().positive();
const idRole = Joi.number().integer().positive();
const idPermission = Joi.number().integer().positive();

const createRolePermissionSchema = Joi.object({
  idRole: idRole.required(),
  idPermission: idPermission.required(),

});

const updateRolePermissionSchema = Joi.object({
  idRole,
  idPermission,
});

const getRolePermissionSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createRolePermissionSchema,
  updateRolePermissionSchema,
  getRolePermissionSchema,
};
