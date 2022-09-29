const Joi = require('joi');
const id = Joi.string().min(1).max(25);
const idCategory = Joi.number().integer().positive();
const photo = Joi.string().min(3).max(200);
const name = Joi.string().min(3).max(50);
const amount = Joi.number().positive();
const price = Joi.number().positive();
const description = Joi.string().min(3).max(500);
const state = Joi.boolean();
const iva = Joi.number().positive();
const limit = Joi.number().integer();
const idVehicle = Joi.number().integer().positive();
const idProduct = Joi.string().min(1).max(25);
const offset = Joi.number().integer();
// const priceMin = Joi.number().positive();
// const priceMax = Joi.number().positive();

const createProductSchema = Joi.object({
  id: id.required(),
  idCategory: idCategory.required(),
  description: description.required(),
  state,
  photo,
  name: name.required(),
  amount,
  price,
  iva

});

const updateProductSchema = Joi.object({
  idCategory: idCategory,
  photo: photo,
  name: name,
  description: description,
  state: state,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const getVehicleOfAProductSchema = Joi.object({
  idProduct: idProduct.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  // priceMin,
  // priceMax: priceMax.when('priceMin',{
  //   is: Joi.number().positive(),
  //   then: priceMax.required()
  // })
});

const addVehicleToProductSchema = Joi.object({
  idProduct: idProduct.required(),
  idVehicle: idVehicle.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
  addVehicleToProductSchema,
  getVehicleOfAProductSchema
};
