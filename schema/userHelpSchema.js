const Joi = require('joi');

const id = Joi.number().integer().positive();
const idModule = Joi.number().integer().positive();
const videoURL = Joi.string().min(1).max(200);


const createUserHelpSchema = Joi.object({
  idModule: idModule.require(),
  videoURL: videoURL.required(),
});

const updateUserHelpSchema = Joi.object({
  idModule,
  videoURL
});

const getUserHelpSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserHelpSchema,
  updateUserHelpSchema,
  getUserHelpSchema,
};
