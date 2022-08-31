const express = require('express');
const BuysDetailsService = require('../services/buysDetailsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createBuyDetailsSchema,
  updateBuyDetailsSchema,
  getBuyDetailsSchema,
} = require('../schema/buyDetailsSchema');
const router = express.Router();

const service = new BuysDetailsService();

router.get('/', async (req, res) => {
  const buysDetails = await service.find();
  res.json(buysDetails);
});

router.get(
  '/:id',
  validatorHandler(getBuyDetailsSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const buyDetails = await service.findById(id);
      res.json(buyDetails);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createBuyDetailsSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBuyDetails = await service.create(body);
      res.status(201).json(newBuyDetails);
      
    } catch (error) {
        next(error);
    }
  }
);

router.patch(
  '/update/:id',
  validatorHandler(getBuyDetailsSchema, 'params'),
  validatorHandler(updateBuyDetailsSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const buyDetails = await service.update(id, body);
      res.json(buyDetails);
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
