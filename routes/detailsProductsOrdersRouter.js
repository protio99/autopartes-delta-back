const express = require('express');
const DetailsProductsService = require('../services/detailsProductsOrdersService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createDetailProductOrderSchema,
  updateDetailProductOrderSchema,
  getDetailProductOrderSchema,
} = require('../schema/detailProductsOrderSchema');
const router = express.Router();

const service = new DetailsProductsService();

router.get('/', async (req, res) => {
  const detailsProductsOrders = await service.find();
  res.json(detailsProductsOrders);
});

router.get(
  '/:id',
  validatorHandler(getDetailProductOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const detailProduct = await service.findById(id);
      res.json(detailProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createDetailProductOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newDetailProductOrder = await service.create(body);
      res.status(201).json(newDetailProductOrder);
      
    } catch (error) {
        next(error);
    }
  }
);

router.patch(
  '/update/:id',
  validatorHandler(getDetailProductOrderSchema, 'params'),
  validatorHandler(updateDetailProductOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const detailProduct = await service.update(id, body);
      res.json(detailProduct);
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
