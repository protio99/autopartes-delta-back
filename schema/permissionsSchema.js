const Joi = require('joi');

const id = Joi.number().integer();
const idModule = Joi.number().integer();
const name = Joi.string().min(3).max(50);

const createPermissionSchema = Joi.object({
  name: name.required(),
  idModule: idModule.required(),

});

const updatePermissionSchema = Joi.object({
  name: name,
  idModule: idModule
});

const getPermissionSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPermissionSchema,
  updatePermissionSchema,
  getPermissionSchema,
};
