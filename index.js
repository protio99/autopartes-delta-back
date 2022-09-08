const express = require('express');
const routerApi = require('./routes/index');
const {
  logErrors,
  errorsHandler,
  boomErrorHandler,
  ormErrorHandler
} = require('./middlewares/errorHandler');
const {checkApiKey} = require('./middlewares/authHandler');
const app = express();
const port = 3000;
app.use(express.json());
require('./utils/auth');

app.get('/',checkApiKey ,(req, res) => {
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
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorsHandler);
