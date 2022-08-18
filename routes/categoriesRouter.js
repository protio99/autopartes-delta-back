const express = require('express');
const CategoriesService = require('./../services/categoryService');
const router = express.Router();

const service = new CategoriesService();

router.get('/', (req, res) => {
  const categories = service.find();
  res.json(categories);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.findById(id);
  res.json(category);
  // if (id === '999') {
  //   res.status(404).json({
  //     status: 'Category not found, keep trying',
  //   });
  // } else {
  //   res.status(200).json({
  //     id,
  //     name: 'Category name',
  //     description: 'Some description',
  //     price: 20000,
  //   });
  // }
});

router.post('/create', (req, res) => {
  const body = req.body;
  const newCategory = service.create(body);
  res.status(201).json(newCategory);
});

router.patch('/update/:id', (req, res) => {
  const id = req.params;
  const body = req.body;

  res.json({
    message: 'Category updated',
    data: body,
    id,
  });
});

router.delete('/delete/:id', (req, res) => {
  const id = req.params;

  res.json({
    message: 'Category deleted',
    id,
  });
});

module.exports = router;
