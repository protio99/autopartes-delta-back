const Joi = require('joi');
const id = Joi.string().min(1).max(25);
const idCategory = Joi.number().integer().positive();
const idBrand = Joi.number().integer().positive();
const photo = Joi.string().min(3).max(200);
const name = Joi.string().min(3).max(50);
const amount = Joi.number();
const price = Joi.number();
const description = Joi.string().min(3).max(500);
const state = Joi.boolean();
const iva = Joi.number();
const limit = Joi.number().integer();
const idVehicle = Joi.number().integer().positive();
const idProduct = Joi.string().min(1).max(25);
const offset = Joi.number().integer();
const status = Joi.boolean();
// const priceMin = Joi.number().positive();
// const priceMax = Joi.number().positive();

const createProductSchema = Joi.object({
  id: id.required(),
  idCategory: idCategory.required(),
  idBrand: idBrand.required(),
  description: description.required(),
  state,
  photo,
  name: name.required(),
  amount,
  price,
  iva

});

const updateProductSchema = Joi.object({
  idCategory,
  description,
  state,
  photo,
  name,
  amount,
  price,
  iva
});

const updateProductFromBuySchema = Joi.object({
  amount,
  price,
  iva
});

const discountProductSchema = Joi.object({
  amount: amount.required()
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const getVehicleOfAProductSchema = Joi.object({
  idProduct: idProduct.required(),
});
const updateVehiclesOfProduct = Joi.object({
  idProduct: idProduct.required(),
  
})
const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  // priceMin,
  // priceMax: priceMax.when('priceMin',{
  //   is: Joi.number().positive(),
  //   then: priceMax.required()
  // })
});

const addVehicleToProductSchema = Joi.object({
  idProduct: idProduct.required(),
  idVehicle: idVehicle.required(),
});
const changeStatusProductSchema = Joi.object({
  status: status.required(),


});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
  addVehicleToProductSchema,
  getVehicleOfAProductSchema,
  updateVehiclesOfProduct,
  updateProductFromBuySchema,
  discountProductSchema,
  changeStatusProductSchema
};
