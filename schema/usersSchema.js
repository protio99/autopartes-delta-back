const Joi = require('joi');

const id = Joi.number().integer().positive();
const idRole = Joi.number().integer().positive();

const email = Joi.string().min(3).max(50);
const password = Joi.string().min(3).max(100);
const status = Joi.Boolean();
const name = Joi.string().min(3).max(30);
const lastname = Joi.string().min(3).max(30);
const registrationDate= Joi.date().format('YYYY-MM-DD').utc();






const createUserSchema = Joi.object({
  email: email.require(),
  password: password.require(),
  email: email.required(),
  name: name.require(),
  lastname: lastname.require(),
  registrationDate: registrationDate.require()
});

const updateUserSchema = Joi.object({
  name: name,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
