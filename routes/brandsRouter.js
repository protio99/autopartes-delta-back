const express = require('express');
const BrandsService = require('../services/brandsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createBrandSchema,
  updateBrandSchema,
  getBrandSchema,
  getVehiclesWhereBrand
} = require('../schema/brandSchema');
const router = express.Router();

const service = new BrandsService();

router.get('/', async (req, res) => {
  const brands = await service.find();
  res.json(brands);
});

router.get(
  '/:id',
  validatorHandler(getBrandSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const Brand = await service.findById(id);
      res.json(Brand);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/get-vehicles-where-brand/:idBrand',
  validatorHandler(getVehiclesWhereBrand, 'params'),
  async (req, res, next) => {
    try {
      const { idBrand } = req.params;
      const vehicles = await service.findVehiclesWhereBrand(idBrand);
      res.json(vehicles);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createBrandSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBrand = await service.create(body);
      res.status(201).json(newBrand);
      
    } catch (error) {
        next(error);
    }
  }
);


router.put(
  '/change-status-of-brand/:id',
  validatorHandler(getBrandSchema, 'params'),
  validatorHandler(updateBrandSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Brand = await service.changeStatusOfBrand(id, body);
      res.json(Brand);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/update/:id',
  validatorHandler(getBrandSchema, 'params'),
  validatorHandler(updateBrandSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Brand = await service.update(id, body);
      res.json(Brand);
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
