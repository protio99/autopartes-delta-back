const express = require('express');
const PermissionsService = require('../services/permissionsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createPermissionSchema,
  updatePermissionSchema,
  getPermissionSchema,
} = require('../schema/permissionSchema');
const router = express.Router();

const service = new PermissionsService();

router.get('/', async (req, res) => {
  const permissions = await service.find();
  res.json(permissions);
});

router.get(
  '/:id',
  validatorHandler(getPermissionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const permission = await service.findById(id);
      res.json(permission);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createPermissionSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPermission = await service.create(body);
      res.status(201).json(newPermission);
      
    } catch (error) {
        next(error);
    }
  }
);

router.patch(
  '/update/:id',
  validatorHandler(getPermissionSchema, 'params'),
  validatorHandler(updatePermissionSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const permission = await service.update(id, body);
      res.json(permission);
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
