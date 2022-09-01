const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().min(3).max(20);
const description= Joi.string().min(1).max(500);


const createModuleSchema = Joi.object({
  name: name.required(),
  description: description,
});

const updateModuleSchema = Joi.object({
  name: name,
  description: description
});

const getModuleSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createModuleSchema,
  updateModuleSchema,
  getModuleSchema,
};
