const express = require('express');
const QuotationsService = require('../services/quotationsDetailsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createQuotationSchema,
  updateQuotationSchema,
  getQuotationSchema,
  // addProductQuotationSchema,
  

} = require('../schema/quotationSchema');
const router = express.Router();

const service = new QuotationsService();

router.get('/', async (req, res) => {
  const orders = await service.find();
  res.json(orders);
});

router.get(
  '/:id',
  validatorHandler(getQuotationSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findById(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  '/quotations-detail/:idUser',
  validatorHandler(getQuotationSchema, 'params'),
  async (req, res, next) => {
    try {
      const { idUser } = req.params;
      const order = await service.getQuotationByIdUser(idUser);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/create',
  validatorHandler(createQuotationSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
      
    } catch (error) {
        next(error);
    }
  }
);
router.post(
  '/update-quotation',
  validatorHandler(updateQuotationSchema, 'body'),
  async (req, res, next) => {
    try {
      const {idUser, quotationData} = req.body;
      const newQuotation = await service.updateQuotation(idUser, quotationData);
      res.status(201).json(newQuotation);
      
    } catch (error) {
        next(error);
    }
  }
);


// router.patch(
//   '/update/:id',
//   validatorHandler(getQuotationSchema, 'params'),
//   validatorHandler(updateQuotationSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const order = await service.update(id, body);
//       res.json(order);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.delete('/delete/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const respuesta = await service.delete(id);
//     res.json(respuesta);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post(
//   '/add-product',
//   validatorHandler(addProductQuotationSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const body = req.body;
//       const newProduct = await service.addProduct(body);
//       res.status(201).json(newProduct);
      
//     } catch (error) {
//         next(error);
//     }
//   }
// );

module.exports = router;
