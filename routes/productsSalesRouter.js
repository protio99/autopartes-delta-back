const express = require('express');
const ProductsSalesService = require('../services/productsSalesService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductSaleSchema,
  updateProductSaleSchema,
  getProductSaleSchema,
} = require('../schema/productSaleSchema');
const router = express.Router();

const service = new ProductsSalesService();

router.get('/', async (req, res) => {
  const productsSales = await service.find();
  res.json(productsSales);
});

router.get(
  '/:id',
  validatorHandler(getProductSaleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const productSale = await service.findById(id);
      res.json(productSale);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createProductSaleSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProductSale = await service.create(body);
      res.status(201).json(newProductSale);
      
    } catch (error) {
        next(error);
    }
  }
);

router.patch(
  '/update/:id',
  validatorHandler(getProductSaleSchema, 'params'),
  validatorHandler(updateProductSaleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const productSale = await service.update(id, body);
      res.json(productSale);
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
