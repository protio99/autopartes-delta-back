const Joi = require('joi').extend(require('@joi/date'));

const id = Joi.number().integer().positive();
const idProvider = Joi.number().integer().positive();
const datePurchase = Joi.date().format('YYYY-MM-DD').utc();
const invoiceNumber= Joi.string().min(3).max(40);
const totalPurchase= Joi.number().positive();
const shippingPrice= Joi.number().positive();
const ivaPercentage= Joi.number().positive();
const totalIva= Joi.number().positive();
const otherTaxesPercentage= Joi.number().positive();
const totalOtherTaxes= Joi.number().positive();
const discountsPercentage= Joi.number().positive();
const totalDiscounts= Joi.number().positive();
const status= Joi.boolean();
const invoiceUrl= Joi.string().min(3).max(40);



const createBuySchema = Joi.object({
  idProvider,
  datePurchase : datePurchase.required(),
  invoiceNumber: invoiceNumber.required(),
  totalPurchase: totalPurchase.required(),
  shippingPrice,
  ivaPercentage,
  totalIva,
  otherTaxesPercentage,
  totalOtherTaxes,
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

module.exports = {
  createBuySchema,
  updatePurchaseBuySchema,
  getBuySchema,
};
