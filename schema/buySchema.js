const Joi = require('joi').extend(require('@joi/date'));

const id = Joi.string().min(1).max(30);
const idProvider = Joi.number().integer().positive();
const datePurchase = Joi.date().format('YYYY-MM-DD').utc();
const invoiceNumber= Joi.string().min(3).max(40);
const totalPurchase= Joi.number().positive();
const shippingPrice= Joi.number().positive();
const ivaPercentage= Joi.number().positive();
const totalIva= Joi.number().positive();
const discountsPercentage= Joi.number().positive();
const totalDiscounts= Joi.number().positive();
const status= Joi.boolean();
const invoiceUrl= Joi.string().min(3).max(40);

// const idDetail = Joi.number().integer().positive();
const idBuy = Joi.string().min(1).max(30);
const idProduct = Joi.string().min(3).max(40);
const amount= Joi.number().integer().positive();
const netPrice= Joi.number().positive();
const profitPercentage= Joi.number().positive();
const salePrice= Joi.number().positive();

const createBuySchema = Joi.object({
  id : id.required(),
  idProvider,
  datePurchase : datePurchase.required(),
  totalPurchase: totalPurchase.required(),
  shippingPrice,
  ivaPercentage,
  totalIva,
  discountsPercentage,
  totalDiscounts,
  invoiceUrl


});
//Organizar los valores de editar
const updatePurchaseBuySchema = Joi.object({
 idProvider,
 datePurchase,
 invoiceNumber,
 totalPurchase,
 totalIva,
 status
});

const getBuySchema = Joi.object({
  id: id.required(),
});

const getBuyDetails = Joi.object({
  idBuy : idBuy.required(),
})

const buyDetails = Joi.object({
  idBuy: idBuy.required(),
  idProduct: idProduct.required(),
  amount: amount.required(),
  netPrice: netPrice.required(),
  shippingPrice,
  discountsPercentage,
  ivaPercentage,
  profitPercentage: profitPercentage.required(),
  salePrice: salePrice.required(),
});

module.exports = {
  createBuySchema,
  updatePurchaseBuySchema,
  getBuySchema,
  buyDetails,
  getBuyDetails
};
