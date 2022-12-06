const express = require('express');
const BuysService = require('../services/buysService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createBuySchema,
  updatePurchaseBuySchema,
  getBuySchema,
  buyDetails,
  getBuyDetails,
} = require('../schema/buySchema');
const router = express.Router();

const service = new BuysService();

router.get(
  '/get-buy-details/:idBuy',
  validatorHandler(getBuyDetails, 'params'),
  async (req, res, next) => {
    try {
      const { idBuy } = req.params;
      const buy = await service.getBuyDetailById(idBuy);
      res.json(buy);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getBuySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const buy = await service.findById(id);
      res.json(buy);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req, res) => {
  const buys = await service.find();
  res.json(buys);
});

router.post(
  '/create',
  validatorHandler(createBuySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBuy = await service.create(body);
      res.status(201).json(newBuy);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/assoiate-products-to-purchasse',
  validatorHandler(buyDetails, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBuy = await service.asocciateProducts(body);
      res.status(201).json(newBuy);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/update/:id',
  validatorHandler(getBuySchema, 'params'),
  validatorHandler(updatePurchaseBuySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const buy = await service.update(id, body);
      res.json(buy);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/cancel-buy/:id',
  validatorHandler(getBuySchema, 'params'),
  // validatorHandler(updatePurchaseBuySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { reason, productsDetailOfBuy } = req.body;
      // console.log('new data desde la ruta', newData);

      const buy = await service.cancelBuy(id, reason, productsDetailOfBuy);
      res.json(buy);
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
