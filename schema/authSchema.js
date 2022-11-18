const Joi = require('joi');

const email = Joi.string().email();
const newPassword = Joi.string().min(3).max(100);
const token = Joi.string().min(3).max(500);

const recoveryPasswordSchema = Joi.object({
  email: email.required(),
});

const resetPasswordSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
});

const verifyTokenSchema = Joi.object({
  token: token.required(),

});





module.exports = {
  recoveryPasswordSchema,
  resetPasswordSchema,
  verifyTokenSchema
  
 
};
