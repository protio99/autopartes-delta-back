const express = require('express');
const ProductsBrandsService = require('../services/productsBrandsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductsBrandsSchema,
  updateProductsBrandsSchema,
  getProductsBrandsSchema,
} = require('../schema/productsbrandsSchema');
const router = express.Router();

const service = new ProductsBrandsService();

router.get('/', async (req, res) => {
  const productsbrands = await service.find();
  res.json(productsbrands);
});

router.get(
  '/:id',
  validatorHandler(getProductsBrandsSchema, 'params'),
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

router.post(
  '/create',
  validatorHandler(createProductsBrandsSchema, 'body'),
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
  '/update/:id',
  validatorHandler(getProductsBrandsSchema, 'params'),
  validatorHandler(updateProductsBrandsSchema, 'body'),
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
