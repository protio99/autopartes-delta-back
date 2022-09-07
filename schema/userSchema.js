const Joi = require('joi')
    .extend(require('@joi/date'));

const id = Joi.number().integer().positive();
const idRol = Joi.number().integer().positive();

const email = Joi.string().email();
const password = Joi.string().min(3).max(100);
const status = Joi.boolean();
const name = Joi.string().min(3).max(30);
const lastname = Joi.string().min(3).max(30);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  name: name.required(),
  lastname: lastname.required(),
  idRol: idRol.required(),
  status: status.required(),

});

const updateUserSchema = Joi.object({
  idRol,
  email,
  password,
  status,
  name,
  lastname,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
