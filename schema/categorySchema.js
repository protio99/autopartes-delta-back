const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const idCategory = Joi.number().integer().positive();
const status = Joi.bool();



const createCategorySchema = Joi.object({
  name: name.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});
const getProductsWhereCategory = Joi.object({
  idCategory: idCategory.required(),
});
const changeStatusCategorySchema = Joi.object({
  status: status.required(),


});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  getProductsWhereCategory,
  changeStatusCategorySchema
};
