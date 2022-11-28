const Joi = require('joi').extend(require('@joi/date'));

const id = Joi.number().integer().positive();
const idRol = Joi.number().integer().positive();
const name = Joi.string().min(3).max(50);
const status = Joi.boolean();
const modulesSelected = Joi.object();

const createRoleSchema = Joi.object({
  id,
  name: name.required(),
  modulesSelected: modulesSelected.required(),
  status,
});

const updateRoleSchema = Joi.object({
  name: name,
  status: status,
});

const getRoleSchema = Joi.object({
  id: id.required(),
});
const getRoleByNameSchema = Joi.object({
  name: name.required(),
});
const getPermissionsByIdRolSchema = Joi.object({
  idRol: idRol.required(),
});

module.exports = {
  createRoleSchema,
  updateRoleSchema,
  getRoleSchema,
  getRoleByNameSchema,
  getPermissionsByIdRolSchema,
};
