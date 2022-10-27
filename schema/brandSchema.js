const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().min(3).max(50);
const idBrand = Joi.number().integer().positive();

const createBrandSchema = Joi.object({
  name: name.required(),
});

const updateBrandSchema = Joi.object({
  name: name,
});

const getBrandSchema = Joi.object({
  id: id.required(),
});
const getVehiclesWhereBrand = Joi.object({
  idBrand: idBrand.required(),
});

module.exports = {
  createBrandSchema,
  updateBrandSchema,
  getBrandSchema,
  getVehiclesWhereBrand
};
