const express = require('express');
const VehiclesService = require('../services/vehiclesService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createVehicleSchema,
  updateVehicleSchema,
  getVehicleSchema,
} = require('../schema/vehicleSchema');
const router = express.Router();

const service = new VehiclesService();

router.get('/', async (req, res) => {
  const vehicles = await service.find();
  res.json(vehicles);
});

router.get(
  '/:id',
  validatorHandler(getVehicleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const vehicle = await service.findById(id);
      res.json(vehicle);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createVehicleSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newVehicle = await service.create(body);
      res.status(201).json(newVehicle);
      
    } catch (error) {
        next(error);
    }
  }
);

router.put(
  '/update/:id',
  validatorHandler(getVehicleSchema, 'params'),
  validatorHandler(updateVehicleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const vehicle = await service.update(id, body);
      res.json(vehicle);
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
