const Joi = require('joi');

const id = Joi.number().integer().positive();
const idBuy = Joi.number().integer().positive();
const idProduct = Joi.string().min(3).max(40);
const amount= Joi.number().integer().positive();
const netPrice= Joi.number().positive();
const profitPercentage= Joi.number().positive();
const salePrice= Joi.number().positive();

const createBuyDetailSchema = Joi.object({
  idBuy: idBuy.required(),
  idProduct: idProduct.required(),
  amount: amount.required(),
  netPrice: netPrice.required(),
  profitPercentage: profitPercentage.required(),
  salePrice: salePrice.required(),
 
});
//Pendiente de agregar los nuevos campos requeridos
const updateBuyDetailSchema = Joi.object({
  idBuy,
  idProduct,
  amount,
  netPrice,
  

});

const getBuyDetailSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createBuyDetailSchema,
  updateBuyDetailSchema,
  getBuyDetailSchema,
};
