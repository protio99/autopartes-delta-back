const express = require('express');
const ProductsBrandsService = require('../services/productsBrandsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductsBrandsSchema,
  updateProductsBrandsSchema,
  getProductsBrandsSchema,
  getProductsWhereBrand,
  changeStatusBrandSchema
} = require('../schema/productsBrandsSchema');
const router = express.Router();

const service = new ProductsBrandsService();

router.get('/', async (req, res) => {
  const productsbrands = await service.find();
  res.json(productsbrands);
});

router.get(
  '/:id',
  validatorHandler(getProductsBrandsSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const Brand = await service.findById(id);
      res.json(Brand);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/get-products-where-brand/:idBrand',
  validatorHandler(getProductsWhereBrand, 'params'),
  async (req, res, next) => {
    try {
      const { idBrand } = req.params;
      const products = await service.findProductsWhereBrand(idBrand);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/create',
  validatorHandler(createProductsBrandsSchema, 'body'),
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
  '/change-status-of-brand/:id',
  validatorHandler(getProductsBrandsSchema, 'params'),
  validatorHandler(changeStatusBrandSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Brand = await service.changeStatusOfBrand(id, body);
      res.json(Brand);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/update/:id',
  validatorHandler(getProductsBrandsSchema, 'params'),
  validatorHandler(updateProductsBrandsSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Brand = await service.update(id, body);
      res.json(Brand);
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
