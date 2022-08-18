const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Users');
});

router.delete('/:id', (req, res) => {
  res.send(`User ${req.params.id} deleted`);
});

module.exports = router;
