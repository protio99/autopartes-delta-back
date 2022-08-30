const Joi = require('joi');

const id = Joi.number().integer().positive();
const idUser = Joi.number().integer().positive();
const total = Joi.number().positive();


const createOrderSchema = Joi.object({
  idUser: idUser.required(),
});

const updateOrderSchema = Joi.object({
  idUser,
  total
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
};
