const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().min(3).max(50);
const model = Joi.string().min(3).max(50);
const idBrand = Joi.number().integer().positive();

const createProductsVehiclesSchema = Joi.object({
  name: name.required(),
  model: model.required(),
  idMarca : idMarca.required(),
});

const updateProductsVehiclesSchema = Joi.object({
  name,
  model,
  idBrand
});

const getProductsVehiclesSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductsVehiclesSchema,
  updateProductsVehiclesSchema,
  getProductsVehiclesSchema,
};
