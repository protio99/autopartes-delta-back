const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().min(3).max(50);

const createProductsBrandsSchema = Joi.object({
  name: name.required(),
});

const updateProductsBrandsSchema = Joi.object({
  name: name,
});

const getProductsBrandsSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductsBrandsSchema,
  updateProductsBrandsSchema,
  getProductsBrandsSchema,
};