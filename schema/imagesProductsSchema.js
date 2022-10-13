const Joi = require('joi');

const id = Joi.number().integer().positive();
const idProduct = Joi.string().min(1).max(25);
const url = Joi.string().min(0).max(200);

const createImagesProductsSchema = Joi.object({
  id: id.required(),
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

module.exports = {
  createImagesProductsSchema,
  updateImagensProductsSchema,
  getImegesProductsSchema,
};