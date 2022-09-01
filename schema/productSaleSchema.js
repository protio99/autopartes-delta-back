const Joi = require('joi');

const id = Joi.number().integer().positive();
const idSale = Joi.number().integer().positive();
const idProduct = Joi.number().integer().positive();
const amount= Joi.number().integer().positive();
const price= Joi.number().positive();
const iva= Joi.number().positive();
const otherTaxes= Joi.number().positive();


const createProductSalesSchema = Joi.object({
  idSale: idSale.required(),
  idProduct: idProduct.required(),
  amount: amount.required(),
  price: price.required()
});

const updateProductSalesSchema = Joi.object({
  idSale,
  idProduct,
  amount,
  price,
  iva,
  otherTaxes,
});

const getProductSalesSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSalesSchema,
  updateProductSalesSchema,
  getProductSalesSchema,
};
