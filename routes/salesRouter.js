const express = require('express');
const SalesService = require('../services/salesService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createSaleSchema,
  updateSaleSchema,
  getSaleSchema,
  saleProductsDetails
} = require('../schema/saleSchema');
const router = express.Router();

const service = new SalesService();

router.get('/', async (req, res) => {
  const sales = await service.find();
  res.json(sales);
});

router.get(
  '/:id',
  validatorHandler(getSaleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const sale = await service.findById(id);
      res.json(sale);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createSaleSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSale = await service.create(body);
      res.status(201).json(newSale);
      
    } catch (error) {
        next(error);
    }
  }
);

router.post(
  '/associate-products-to-sale',
  validatorHandler(saleProductsDetails, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSale = await service.asocciateProducts(body);
      res.status(201).json(newSale);
      
    } catch (error) {
        next(error);
    }
  }
);
router.patch(
  '/update/:id',
  validatorHandler(getSaleSchema, 'params'),
  validatorHandler(updateSaleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const sale = await service.update(id, body);
      res.json(sale);
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
