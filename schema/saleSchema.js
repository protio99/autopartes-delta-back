const Joi = require('joi')
    .extend(require('@joi/date'));

const id = Joi.number().integer().positive();
const idClient = Joi.number().integer().positive();
const saleDate = Joi.date().format('YYYY-MM-DD').utc();
const statusSale = Joi.string().min(3).max(50);
const statusPayment = Joi.string().min(3).max(50);
const totalPurchase = Joi.number().positive();

const idSale = Joi.number().integer().positive();
const idProduct = Joi.string().min(0).max(50);
const amount = Joi.number().integer().positive();
const price = Joi.number().positive();

const createSaleSchema = Joi.object({
  idClient,
  saleDate: saleDate.required(),
  statusSale: statusSale.required(),
  statusPayment: statusPayment.required(),
  totalPurchase: totalPurchase.required(),
});

const updateSaleSchema = Joi.object({
  idClient: idClient,
  saleDate: saleDate,
  statusSale: statusSale,
  statusPayment: statusPayment,
  totalPurchase: totalPurchase,
});

const getSaleSchema = Joi.object({
  id: id.required(),
});

const saleProductsDetails = Joi.object({
  idSale: idSale.required(),
  idProduct: idProduct.required(),
  amount: amount.required(),
  price: price.required(),

});

module.exports = {
  createSaleSchema,
  updateSaleSchema,
  getSaleSchema,
  saleProductsDetails
};
