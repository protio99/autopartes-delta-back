
const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().min(3).max(50);
const idProductBrand = Joi.number().integer().positive();
const status = Joi.bool();

const createProductsBrandsSchema = Joi.object({
  name: name.required(),
});

const updateProductsBrandsSchema = Joi.object({
  name: name,
});

const changeStatusBrandSchema = Joi.object({
  status: status.required(),


})

const getProductsBrandsSchema = Joi.object({
  id: id.required(),
});

const getProductsWhereBrand = Joi.object({
  idBrand: idProductBrand.required(),
});

module.exports = {
  createProductsBrandsSchema,
  updateProductsBrandsSchema,
  getProductsBrandsSchema,
  getProductsWhereBrand,
  changeStatusBrandSchema
};