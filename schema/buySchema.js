const Joi = require('joi')
    .extend(require('@joi/date'));

const id = Joi.number().integer().positive();
const idProvider = Joi.number().integer().positive();
const date = Joi.date().format('YYYY-MM-DD').utc();

const invoiceNumber= Joi.string().min(0).max(40);
const totalBuy= Joi.number().positive();
const  totalIva= Joi.number().positive();
const otherTaxes= Joi.number().positive();
const totalValue= Joi.number().positive();
const status= Joi.boolean();


const createBuySchema = Joi.object({
  idProvider: idProvider.required(),
  date : date.required(),
  invoiceNumber: invoiceNumber.required(),

});

const updateBuySchema = Joi.object({
 idProvider,
 date,
 invoiceNumber,
 totalBuy,
 totalIva,
 otherTaxes,
 totalValue,
 status
});

const getBuySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createBuySchema,
  updateBuySchema,
  getBuySchema,
};
