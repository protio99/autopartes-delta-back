const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Products');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id === '999') {
    res.status(404).json({
      status: 'Product not found, keep trying',
    });
  } else {
    res.status(200).json({
      id,
      name: 'Product name',
      description: 'Some description',
      price: 20000,
    });
  }
});

router.post('/create', (req, res) => {
  const body = req.body;

  res.status(201).json({
    message: 'Product create',
    data: body,
  });
});

router.patch('/update/:id', (req, res) => {
  const id = req.params;
  const body = req.body;

  res.json({
    message: 'Product updated',
    data: body,
    id,
  });
});

router.delete('/delete/:id', (req, res) => {
  const id = req.params;

  res.json({
    message: 'Product deleted',
    id,
  });
});

module.exports = router;
