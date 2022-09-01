const Joi = require('joi')
    .extend(require('@joi/date'));

const id = Joi.number().integer().positive();
const name = Joi.string().min(3).max(50);
const creationDate = Joi.date().format('YYYY-MM-DD').utc();
const status = Joi.boolean();

const createRoleSchema = Joi.object({
  name: name.required(),
  status: status.required(),
});

const updateRoleSchema = Joi.object({
  name: name,
  status: status,
});

const getRoleSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createRoleSchema,
  updateRoleSchema,
  getRoleSchema,
};
