const Joi = require('joi');

const id = Joi.number().integer().positive();
const idProduct = Joi.string().min(1).max(25);
const url = Joi.any().required();

const createImagesProductsSchema = Joi.object({
  idProduct: idProduct.required(),
  url: url.required(), 
});

const updateImagensProductsSchema = Joi.object({
  idProduct: idProduct,
  url: url,
});

const getImegesProductsSchema = Joi.object({
  id: id.required(),
});
const findByIdProductSchema = Joi.object({
  idProduct: idProduct.required(),
});

module.exports = {
  createImagesProductsSchema,
  updateImagensProductsSchema,
  getImegesProductsSchema,
  findByIdProductSchema
};