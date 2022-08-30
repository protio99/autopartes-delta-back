const Joi = require('joi');

const id = Joi.number().integer();
const idSale = Joi.number().integer();
const idProduct = Joi.number().integer();

const amount= Joi.string().min(1).max(50);
const unitPrice= Joi.number().float();
const  iva= Joi.number().float();
const otherTaxes= Joi.number().float();


const createDetailSchema = Joi.object({
  name: name.required(),
  idSale: idSale.required(),
  idProduct: idProduct.required(),
  amount: amount.required(),
  unitPrice: unitPrice.required(),
  iva:iva.required(),
  otherTaxes: otherTaxes.required()
});

const updateCategorySchema = Joi.object({
  name,
  idSale,
  idProduct,
  amount,
  unitPrice,
  iva,
  otherTaxes
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};
