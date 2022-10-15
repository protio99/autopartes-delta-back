const express = require('express');
const ImagesProductsService = require('../services/imagesProductsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  
  updateImagensProductsSchema,
  getImegesProductsSchema,
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



const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'public/images');
  },
  filename: function(req, file, cb) {   
    const url = getImageName(req.body.idProduct, file)

      cb(null,url);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}



function getImageName(idProduct, file) {
  file
  const extension = path.extname(file.originalname)
  return `product_${idProduct}${extension}`
}
let upload = multer({ storage, fileFilter });
router.post(
  '/create',
  upload.single('photo'),
  async (req, res, next) => {
    try {
      const url = "/public/images/"+getImageName(req.body.idProduct, req.file)
      console.log(req.body.idProduct, url)
      const newImageProduct = await service.create(req.body.idProduct, url);
      res.status(201).json(newImageProduct);
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
