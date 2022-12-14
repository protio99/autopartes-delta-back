const Joi = require('joi');

// const id = Joi.number().integer().positive();
const idUser = Joi.number().integer().positive();
const idProduct = Joi.number().positive();
const idQuotation = Joi.number().positive();
const amount = Joi.number().integer().min(1);
const quotationData = Joi.object()

const createQuotationSchema = Joi.object({
  idUser: idUser.required(),
});

const updateQuotationSchema = Joi.object({
  idUser : idUser.required(),
  quotationData: quotationData.required()
  
});

const getQuotationSchema = Joi.object({
  idUser: idUser.required(),
});

const addProductQuotationSchema = Joi.object({
  idQuotation: idQuotation.required(),
  idProduct: idProduct.required(),
  amount: amount.required(),

})

module.exports = {
  createQuotationSchema,
  updateQuotationSchema,
  getQuotationSchema,
  addProductQuotationSchema
};
