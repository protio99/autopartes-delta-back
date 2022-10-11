const express = require('express');
const RolesService = require('../services/rolesService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createRoleSchema,
  updateRoleSchema,
  getRoleSchema,
  getRoleByNameSchema
} = require('../schema/roleSchema');
const router = express.Router();

const service = new RolesService();
router.get(
  '/find-by-name/:name',
  validatorHandler(getRoleByNameSchema, 'params'),
  async (req, res, next) => {
    try {
      const { name } = req.params;
      const role = await service.findByName(name);
      res.json(role);
    } catch (error) {
      next(error);
    }
  }
);
router.get('/', async (req, res) => {
  const roles = await service.find();
  res.json(roles);
});

router.get(
  '/:id',
  validatorHandler(getRoleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = await service.findById(id);
      res.json(role);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/create',
  validatorHandler(createRoleSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRole = await service.create(body);
      res.status(201).json(newRole);
      
    } catch (error) {
        next(error);
    }
  }
);

router.put(
  '/update/:id',
  validatorHandler(getRoleSchema, 'params'),
  validatorHandler(updateRoleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const role = await service.update(id, body);
      res.json(role);
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
