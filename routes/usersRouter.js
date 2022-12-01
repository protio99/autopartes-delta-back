const express = require('express');
const UsersService = require('../services/usersService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schema/userSchema');
const router = express.Router();
const passport = require('passport');

const service = new UsersService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get(
  '/get-previous-user',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const idUser = req.user.sub;
      const user = await service.findById(idUser);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/post-real-password',
  async (req, res, next) => {
    try {
      const password = req.body.password;
      const realPassword = req.body.realPassword;
      //comprobar
      const answer = await service.comparePassword(password, realPassword);
      res.json(answer);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
      
    } catch (error) {
        next(error);
    }
  }
);

router.put(
  '/update/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
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
