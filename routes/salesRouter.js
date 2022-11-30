const express = require('express');
const SalesService = require('../services/salesService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createSaleSchema,
  updateSaleSchema,
  getSaleSchema,
  saleProductsDetails,
  getSaleDetails,
} = require('../schema/saleSchema');
const passport = require('passport');
const router = express.Router();

const service = new SalesService();

router.get('/', async (req, res) => {
  const sales = await service.find();
  res.json(sales);
});

router.get(
  '/get-previous-sales',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const idUser = req.user.sub;
      const sale = await service.getPreviousSales(idUser);
      res.json(sale);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/get-previous-sales-by-id/:idSale',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { idSale } = req.params;
      const sale = await service.getPreviousSaleById(idSale);
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
  '/create-sale',
  // validatorHandler(createSaleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { personalInfo, shippingInfo, cart } = req.body;
      const response = await service.createFromWebSite(
        personalInfo,
        shippingInfo,
        cart
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/create-sale-token',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const idUser = req.user.sub;
      const { personalInfo, shippingInfo, cart } = req.body;
      const permissions = await service.createFromWebSiteWithToken(
        personalInfo,
        shippingInfo,
        cart,
        idUser
      );
      res.json(permissions);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/buy-confirmation',
  // validatorHandler(recoveryPasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendBuyConfirmation(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/get-sale-details/:idSale',
  validatorHandler(getSaleDetails, 'params'),
  async (req, res, next) => {
    try {
      const { idSale } = req.params;
      const buy = await service.getSaleDetailById(idSale);
      res.json(buy);
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

module.exports = router;
