const express = require('express');
const routerApi = require('./routes/index');
const {
  logErrors,
  errorsHandler,
  boomErrorHandler,
} = require('./middlewares/errorHandler');
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
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorsHandler);
