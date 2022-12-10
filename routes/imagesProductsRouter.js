const express = require('express');
const ImagesProductsService = require('../services/imagesProductsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  updateImagensProductsSchema,
  getImegesProductsSchema,
  findByIdProductSchema,
} = require('../schema/imagesProductsSchema');
const router = express.Router();

const multer = require('multer');
let path = require('path');

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
      const ImagesProduct = await service.findById(id);
      res.json(ImagesProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/find-by-idProduct/:idProduct',
  validatorHandler(findByIdProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { idProduct } = req.params;
      const ImageProduct = await service.findByProductId(idProduct);
      res.json(ImageProduct);
    } catch (error) {
      next(error);
    }
  }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const url = getImageName(req.params.idProduct, file);
    cb(null, url);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

function getImageName(idProduct, file) {
  const extension = path.extname(file.originalname);
  return `product_${idProduct}${extension}`;
}

let upload = multer({ storage, fileFilter });

router.post('/create/:idProduct', upload.single('photo'), async (req, res) => {
  try {
    const { idProduct } = req.params;
    const url = '/public/images/' + getImageName(idProduct, req.file);
    const newImageProduct = await service.create(idProduct, url);
    res.status(201).json(newImageProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

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
