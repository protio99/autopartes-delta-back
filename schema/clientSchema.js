const Joi = require('joi');
const id = Joi.number().integer();
const idUser = Joi.number().integer();
const name = Joi.string().min(2).max(100);
const lastname = Joi.string().min(2).max(200);
const documentType = Joi.string().min(2).max(100);
const document = Joi.string().min(4).max(50);
const telephone = Joi.string().min(6).max(20);
const email = Joi.string().min(3).max(100);
const country = Joi.string().min(3).max(100);
const department = Joi.string().min(3).max(100);
const city = Joi.string().min(3).max(100);
const neightboorhood = Joi.string().min(3).max(100);
const address = Joi.string().min(3).max(200);
const indications = Joi.string().min(3).max(500);

const createClientSchema = Joi.object({
  idUser: idUser.required(),
  name: name.required(),
  lastname: lastname.required(),
  documentType: documentType.required(),
  document: document.required(),
  telephone: telephone.required(),
  email: email.required(),
  country: country.required(),
  department: department.required(),
  city: city.required(),
  neightboorhood: neightboorhood.required(),
  address: address.required(),
  
});

const updateClientSchema = Joi.object({
  idUser: idUser,
  name: name,
  lastname: lastname,
  documentType: documentType,
  document: document,
  telephone: telephone,
  email: email,
  country: country,
  department: department,
  city: city,
  neightboorhood: neightboorhood,
  address: address,
  indications : indications
});

const getClientSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createClientSchema,
  updateClientSchema,
  getClientSchema,
};
