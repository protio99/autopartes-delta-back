const Joi = require('joi');

const id = Joi.number().integer().positive();
const idProduct = Joi.number().integer().positive();
const amount = Joi.number().integer().positive();
const idOrder = Joi.number().integer().positive();


const createDetailProductOrderSchema = Joi.object({
  idProduct: idProduct.required(),
  amount: amount.required(),
  idOrder: idOrder.required(),
});

const updateDetailProductOrderSchema = Joi.object({
  idProduct,
  amount,
  idOrder,
});

const getDetailProductOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createDetailProductOrderSchema,
  updateDetailProductOrderSchema,
  getDetailProductOrderSchema,
};
