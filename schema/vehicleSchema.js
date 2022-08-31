const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().min(3).max(50);
const model = Joi.string().min(3).max(50);
const brand = Joi.string().min(3).max(50);

const createVehicleSchema = Joi.object({
  name: name.required(),
  model: model.required(),
  brand: brand.required(),
});

const updateVehicleSchema = Joi.object({
  name,
  model,
  brand
});

const getVehicleSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createVehicleSchema,
  updateVehicleSchema,
  getVehicleSchema,
};
