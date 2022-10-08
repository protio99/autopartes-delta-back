const Joi = require('joi');

const id = Joi.number().integer().positive();
const nit =Joi.string().min(0).max(100);
const companyName = Joi.string().min(3).max(100);
const contactName = Joi.string().min(3).max(100);
const telephone = Joi.string().min(3).max(50);
const adress = Joi.string().min(3).max(100);
const email = Joi.string().min(3).max(100);
const country = Joi.string().min(3).max(50);

const createProviderSchema = Joi.object({
  nit: nit.required(),
  companyName: companyName.required(),
  contactName: contactName.required(),
  telephone: telephone.required(),
  adress: adress.required(),
  email: email.required(),
  country: country.required(),

});

const updateProviderSchema = Joi.object({
  nit,
  companyName,
  contactName,
  telephone,
  adress,
  email,
  country
});

const getProviderSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProviderSchema,
  updateProviderSchema,
  getProviderSchema,
};
