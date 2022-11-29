const Joi = require('joi');

const id = Joi.number().integer().positive();
const idBuy = Joi.string().min(1).max(30);
const url = Joi.any().required();

const createFilesBuysSchema = Joi.object({
  idBuy: idBuy.required(),
  url: url.required(), 
});

const updateFilesBuysSchema = Joi.object({
  idBuy: idBuy,
  url: url,
});

const getFilesBuysSchema = Joi.object({
  id: id.required(),
});
const findByFileBuyIdSchema = Joi.object({
  idBuy: idBuy.required(),
});

module.exports = {
  createFilesBuysSchema,
  updateFilesBuysSchema,
  getFilesBuysSchema,
  findByFileBuyIdSchema
};