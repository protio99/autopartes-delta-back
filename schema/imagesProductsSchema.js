const Joi = require('joi');

const id = Joi.number().integer().positive();
const idProduct = Joi.string().min(1).max(25);
const photo = Joi.any().required();

const createImagesProductsSchema = Joi.object({
  idProduct: idProduct.required(),
  photo: photo, 
});

const updateImagensProductsSchema = Joi.object({
  idProduct: idProduct,
  photo: photo,
});

const getImegesProductsSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createImagesProductsSchema,
  updateImagensProductsSchema,
  getImegesProductsSchema,
};