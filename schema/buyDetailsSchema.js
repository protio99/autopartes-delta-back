const Joi = require('joi');

const id = Joi.number().integer().positive();
const idSale = Joi.number().integer().positive();
const idProduct = Joi.number().integer().positive();

const amount= Joi.number().integer().positive();
const unitPrice= Joi.number().positive();
const  iva= Joi.number().positive();
const otherTaxes= Joi.number().positive();


const createBuyDetailSchema = Joi.object({
  idSale: idSale.required(),
  idProduct: idProduct.required(),
  amount: amount.required(),
  unitPrice: unitPrice.required(),
  iva:iva.required(),
});

const updateBuyDetailSchema = Joi.object({
  idSale,
  idProduct,
  amount,
  unitPrice,
  iva,
  otherTaxes
});

const getBuyDetailSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createBuyDetailSchema,
  updateBuyDetailSchema,
  getBuyDetailSchema,
};
