const express = require('express');
const FilesBuysService = require('../services/filesBuysService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  updateFilesBuysSchema,
  getFilesBuysSchema,
  findByFileBuyIdSchema,

} = require('../schema/filesBuysSchema');
const router = express.Router();

const multer = require('multer');
let path = require('path');

const service = new FilesBuysService();

router.get('/', async (req, res) => {
  const filesBuys = await service.find();
  res.json(filesBuys);
});

router.get(
  '/:id',
  validatorHandler(getFilesBuysSchema, 'params'),
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
  '/find-by-idBuy/:idBuy',
  validatorHandler(findByFileBuyIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { idBuy } = req.params;
      const FileBuy = await service.findByProductId(idBuy);
      res.json(FileBuy);
    } catch (error) {
      next(error);
    }
  }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/files');
  },
  filename: function (req, file, cb) {
    const url = getFileName(req.params.idBuy, file);
    cb(null, url);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['file/pdf'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

function getFileName(idBuy, file) {
  const extension = path.extname(file.originalname);
  return `buy_${idBuy}${extension}`;
}

let upload = multer({ storage, fileFilter });

router.post(
  '/create/:idBuy',
  upload.single('file'),
  async (req, res) => {
    try {
      const { idBuy } = req.params;
      const url = '/public/files/' + getFileName(idBuy, req.file);
      const newFileBuy = await service.create(idBuy, url);
      res.status(201).json(newFileBuy);
    } catch (error) {
      res.status(500).json(error)
    }
  }
);

router.put(
  '/update/:id',
  validatorHandler(getFilesBuysSchema, 'params'),
  validatorHandler(updateFilesBuysSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const filesBuys = await service.update(id, body);
      res.json(filesBuys);
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
