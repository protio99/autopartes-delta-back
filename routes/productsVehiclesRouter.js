const express = require('express');
const ProductsVehiclesService = require('../services/productsVehiclesService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductVehicleSchema,
  updateProductVehicleSchema,
  getProductVehicleSchema,
} = require('../schema/productVehicleSchema');
const router = express.Router();

const service = new ProductsVehiclesService();

router.get('/', async (req, res) => {
  const productsVehicles = await service.find();
  res.json(productsVehicles);
});

router.get(
  '/:id',
  validatorHandler(getProductVehicleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const productVehicle = await service.findById(id);
      res.json(productVehicle);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createProductVehicleSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProductVehicle = await service.create(body);
      res.status(201).json(newProductVehicle);
      
    } catch (error) {
        next(error);
    }
  }
);

router.patch(
  '/update/:id',
  validatorHandler(getProductVehicleSchema, 'params'),
  validatorHandler(updateProductVehicleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const productVehicle = await service.update(id, body);
      res.json(productVehicle);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const respuesta = await service.delete(id);
    res.json(respuesta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
