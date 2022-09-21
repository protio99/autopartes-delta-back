const express = require('express');
const passport = require('passport');
const CategoriesService = require('../services/categoriesService');
const validatorHandler = require('./../middlewares/validatorHandler');
const {checkRoles} = require('./../middlewares/authHandler')
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('./../schema/categorySchema');
const router = express.Router();

const service = new CategoriesService();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findById(id);
      res.json(category);
    } catch (error) {
      next(error);
      
    }
  }
);
router.post(
  '/create',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
      
    } catch (error) {
        next(error);
    }
  }
);
// router.post(
//   '/create',
//   passport.authenticate('jwt',{session: false}),
//   checkRoles(1,2),
//   validatorHandler(createCategorySchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const body = req.body;
//       const newCategory = await service.create(body);
//       res.status(201).json(newCategory);
      
//     } catch (error) {
//         next(error);
//     }
//   }
// );

router.patch(
  '/update/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
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
