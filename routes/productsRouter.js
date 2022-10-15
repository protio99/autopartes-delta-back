const express = require('express');
const ProductsService = require('../services/productsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
  addVehicleToProductSchema,
  getVehicleOfAProductSchema,
  updateProductFromBuySchema,
  discountProductSchema
} = require('../schema/productSchema');
const router = express.Router();

const service = new ProductsService();

router.get('/',
validatorHandler(queryProductSchema, 'query'),
 async (req, res, next) => {
  try {
    const products = await service.find(req.query);
    res.json(products);
    
  } catch (error) {
    next(error)
  }
});
router.get('/find-vehicles-of-a-product',
 async (req, res, next) => {
  try {
    const products = await service.findAllVehiclesOfAProduct(req.query);
    res.json(products);
    
  } catch (error) {
    next(error)
  }
});

router.get(
  '/find-vehicles-of-a-product/:idProduct',
  validatorHandler(getVehicleOfAProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { idProduct } = req.params;
      const product = await service.findVehiclesOfAProduct(idProduct);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findById(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
      
    } catch (error) {
        next(error);
    }
  }
);

router.post(
  '/add-vehicle-to-product',
  validatorHandler(addVehicleToProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newVehicleToProduct = await service.addVehicleToProduct(body);
      res.status(201).json(newVehicleToProduct);
      
    } catch (error) {
        next(error);
    }
  }
);

router.put(
  '/update/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/update-vehicles-of-products/:idProduct',
  validatorHandler(getVehicleOfAProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { idProduct } = req.params;
      const body = req.body;
      const product = await service.updateVehiclesOfProduct(idProduct, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/update-product-from-buy/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductFromBuySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.updateFromBuy(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/discount-product/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(discountProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.discountProduct(id, body);
      res.json(product);
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
