const Joi = require('joi');

const id = Joi.number().integer().positive();
const idCategory = Joi.number().integer().positive();
const idVehicle = Joi.number().integer().positive();
const photo = Joi.string().min(3).max(200);
const name = Joi.string().min(3).max(50);
const amount = Joi.number().positive();
const price = Joi.number().positive();
const description = Joi.string().min(3).max(500);
const state = Joi.boolean();
const iva = Joi.number().positive();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
// const priceMin = Joi.number().positive();
// const priceMax = Joi.number().positive();




const createProductSchema = Joi.object({
  idCategory: idCategory.required(),
  idVehicle: idVehicle.required(),
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
  idVehicle: idVehicle,
  photo: photo,
  name: name,
  description: description,
  state: state,
});

const getProductSchema = Joi.object({
  id: id.required(),
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


module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
};
