const Joi = require('joi');

const id = Joi.number().integer().positive();
const idClient = Joi.number().integer().positive();
const saleDate = Joi.date().format('YYYY-MM-DD').utc();
const statusSale = Joi.string().min(3).max(50);
const statusPayment = Joi.string().min(3).max(50);
const totalPurchase = Joi.number().positive();

const createSaleSchema = Joi.object({
  idClient: idClient.required(),
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

module.exports = {
  createSaleSchema,
  updateSaleSchema,
  getSaleSchema,
};
