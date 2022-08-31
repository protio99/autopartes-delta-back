const Joi = require('joi');

const id = Joi.number().integer().positive();
const idCategory = Joi.number().integer().positive();
const idBrand = Joi.number().integer().positive();
const idVehicle = Joi.number().integer().positive();
const photo = Joi.string().min(3).max(200);
const name = Joi.string().min(3).max(50);
const amount = Joi.number().positive();
const price = Joi.number().positive();
const description = Joi.string().min(3).max(500);
const state = Joi.boolean();
const iva = Joi.number().positive();

const createProductSchema = Joi.object({
  idCategory: idCategory.required(),
  idBrand: idBrand.required(),
  idVehicle: idVehicle.required(),
  photo: photo.required(),
  name: name.required(),
 
  
});

const updateProductSchema = Joi.object({
  idCategory: idCategory,
  idBrand: idBrand,
  idVehicle: idVehicle,
  photo: photo,
  name: name,
  description: description,
  state: state,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
