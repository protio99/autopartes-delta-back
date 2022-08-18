const express = require('express');
const routerApi = require('./routes/index');
const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/', (req, res) => {
  res.send('Hello world post');
});

app.listen(port, () => {
  console.log('Connected to port 3000');
});
routerApi(app);
