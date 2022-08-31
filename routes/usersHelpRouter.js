const express = require('express');
const UsersHelpService = require('../services/usersHelpService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createUserHelpSchema,
  updateUserHelpSchema,
  getUserHelpSchema,
} = require('../schema/userHelpSchema');
const router = express.Router();

const service = new UsersHelpService();

router.get('/', async (req, res) => {
  const usersHelp = await service.find();
  res.json(usersHelp);
});

router.get(
  '/:id',
  validatorHandler(getUserHelpSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userHelp = await service.findById(id);
      res.json(userHelp);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createUserHelpSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUserHelp = await service.create(body);
      res.status(201).json(newUserHelp);
      
    } catch (error) {
        next(error);
    }
  }
);

router.patch(
  '/update/:id',
  validatorHandler(getUserHelpSchema, 'params'),
  validatorHandler(updateUserHelpSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const userHelp = await service.update(id, body);
      res.json(userHelp);
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
