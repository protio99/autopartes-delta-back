const express = require('express');
const RolesService = require('../services/rolesService');
const passport = require('passport');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  updateRoleSchema,
  getRoleSchema,
  getRoleByNameSchema,
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
router.get(
  '/permissions',
  passport.authenticate('jwt', { session: false }),

  async (req, res, next) => {
    try {
      const idRol = req.user.role;
      const permissions = await service.permissionsByIdRol(idRol);
      res.json(permissions);
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
  // validatorHandler(createRoleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { name, selectedModules } = req.body;

      const newRole = await service.create(name, selectedModules);
      res.status(201).json(newRole);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/updateStatus/:id',
  validatorHandler(getRoleSchema, 'params'),
  validatorHandler(updateRoleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const rol = await service.update(id, body);
      res.json(rol);
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  '/update/:id',
  // validatorHandler(getRoleSchema, 'params'),
  // validatorHandler(updateRoleSchema, 'body'),
  async (req, res, next) => {
    try {
      const name = req.body.name;
      const selectedModules = req.body.selectedModules;
      const { id } = req.params;
      const editRol = await service.update(id, name, selectedModules);
      res.json(editRol);
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
