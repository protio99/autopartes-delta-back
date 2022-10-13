const express = require('express');
const ImagesProductsService = require('../services/imagesProductsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createImagesProductsSchema,
  updateImagensProductsSchema,
  getImegesProductsSchema,
} = require('../schema/imagesProductsSchema');
const router = express.Router();

const service = new ImagesProductsService();

router.get('/', async (req, res) => {
  const imagesProducts = await service.find();
  res.json(imagesProducts);
});

router.get(
  '/:id',
  validatorHandler(getImegesProductsSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const Brand = await service.findById(id);
      res.json(imagesProducts);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createImagesProductsSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBrand = await service.create(body);
      res.status(201).json(newBrand);
      
    } catch (error) {
        next(error);
    }
  }
);

router.put(
  '/update/:id',
  validatorHandler(getImegesProductsSchema, 'params'),
  validatorHandler(updateImagensProductsSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const imagesProducts = await service.update(id, body);
      res.json(imagesProducts);
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
