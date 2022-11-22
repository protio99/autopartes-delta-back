const express = require('express');
const RolesPermissionsService = require('../services/rolesPermissionsService');
const validatorHandler = require('./../middlewares/validatorHandler');
const {
  createRolePermissionSchema,
  updateRolePermissionSchema,
  getRolePermissionSchema,
  getPermissionsOfRolSchema
} = require('./../schema/rolePermissionSchema');
const router = express.Router();

const service = new RolesPermissionsService();

router.get('/', async (req, res) => {
  const rolesPermissions = await service.find();
  res.json(rolesPermissions);
});

router.get(
  '/:id',
  validatorHandler(getRolePermissionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rolePermission = await service.findById(id);
      res.json(rolePermission);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/get-permissions-of-rol/:idRol',
  validatorHandler(getPermissionsOfRolSchema, 'params'),
  async (req, res, next) => {
    try {
      const { idRol } = req.params;
      const permissionsOfRol = await service.findPermissionsOfRolSelected(idRol);
      res.json(permissionsOfRol);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/create',
  validatorHandler(createRolePermissionSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRolePermission = await service.create(body);
      res.status(201).json(newRolePermission);
      
    } catch (error) {
        next(error);
    }
  }
);

router.put(
  '/update/:id',
  validatorHandler(getRolePermissionSchema, 'params'),
  validatorHandler(updateRolePermissionSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const rolePermission = await service.update(id, body);
      res.json(rolePermission);
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
