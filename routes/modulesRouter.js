const express = require('express');
const ModulesService = require('../services/modulesService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createModuleSchema,
  updateModuleSchema,
  getModuleSchema,
} = require('../schema/moduleSchema');
const router = express.Router();

const service = new ModulesService();

router.get('/', async (req, res) => {
  const modules = await service.find();
  res.json(modules);
});

router.get(
  '/:id',
  validatorHandler(getModuleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const module = await service.findById(id);
      res.json(module);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createModuleSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newModule = await service.create(body);
      res.status(201).json(newModule);
      
    } catch (error) {
        next(error);
    }
  }
);

router.patch(
  '/update/:id',
  validatorHandler(getModuleSchema, 'params'),
  validatorHandler(updateModuleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const module = await service.update(id, body);
      res.json(module);
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
