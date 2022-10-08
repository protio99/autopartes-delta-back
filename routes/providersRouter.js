const express = require('express');
const ProvidersService = require('../services/providersService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProviderSchema,
  updateProviderSchema,
  getProviderSchema,
} = require('../schema/providerSchema');
const router = express.Router();

const service = new ProvidersService();

router.get('/', async (req, res) => {
  const providers = await service.find();
  res.json(providers);
});

router.get(
  '/:id',
  validatorHandler(getProviderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const provider = await service.findById(id);
      res.json(provider);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createProviderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProvider = await service.create(body);
      res.status(201).json(newProvider);
      
    } catch (error) {
        next(error);
    }
  }
);

router.put(
  '/update/:id',
  validatorHandler(getProviderSchema, 'params'),
  validatorHandler(updateProviderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const provider = await service.update(id, body);
      res.json(provider);
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
