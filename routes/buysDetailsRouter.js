const express = require('express');
const BuysDetailsService = require('../services/buysDetailsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createBuyDetailSchema,
  updateBuyDetailSchema,
  getBuyDetailSchema,
} = require('../schema/buyDetailSchema');
const router = express.Router();

const service = new BuysDetailsService();

router.get('/', async (req, res) => {
  const buysDetails = await service.find();
  res.json(buysDetails);
});

router.get(
  '/:id',
  validatorHandler(getBuyDetailSchema, 'params'),
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
  validatorHandler(createBuyDetailSchema, 'body'),
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
  validatorHandler(getBuyDetailSchema, 'params'),
  validatorHandler(updateBuyDetailSchema, 'body'),
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
