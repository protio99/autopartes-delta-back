const express = require('express');
const ClientsService = require('../services/clientsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createClientSchema,
  updateClientSchema,
  getClientSchema,
} = require('../schema/clientSchema');
const router = express.Router();

const service = new ClientsService();

router.get('/', async (req, res) => {
  const clients = await service.find();
  res.json(clients);
});

router.get(
  '/:id',
  validatorHandler(getClientSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const client = await service.findById(id);
      res.json(client);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createClientSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newClient = await service.create(body);
      res.status(201).json(newClient);
      
    } catch (error) {
        next(error);
    }
  }
);

router.put(
  '/update/:id',
  validatorHandler(getClientSchema, 'params'),
  validatorHandler(updateClientSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const client = await service.update(id, body);
      res.json(client);
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
