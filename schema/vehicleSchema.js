const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().min(3).max(50);
const model = Joi.string().min(3).max(50);
const idBrand = Joi.number().integer().positive();
const status = Joi.boolean();
const idVehicle = Joi.number().integer().positive();


const createVehicleSchema = Joi.object({
  name: name.required(),
  model: model.required(),
  idBrand: idBrand.required(),
});

const updateVehicleSchema = Joi.object({
  name,
  model,
  idBrand,
  status
});
const changeStatusVehicleSchema = Joi.object({
  status: status.required(),


});
const getVehicleSchema = Joi.object({
  id: id.required(),
});
const getProductsWhereVehicle = Joi.object({
  idVehicle: idVehicle.required(),
});

module.exports = {
  createVehicleSchema,
  updateVehicleSchema,
  getVehicleSchema,
  changeStatusVehicleSchema,
  getProductsWhereVehicle
};
