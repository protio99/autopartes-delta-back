const express = require('express');
const routerApi = require('./routes/index');
const {
  logErrors,
  errorsHandler,
  boomErrorHandler,
  ormErrorHandler
} = require('./middlewares/errorHandler');
const cors = require('cors');
const {checkApiKey} = require('./middlewares/authHandler');
const app = express();
const port = 5000;
app.use(express.json());
require('./utils/auth');

const whitelist = ['http://localhost:3000'];
const options = {
  origin: (origin, callback) =>{
    if(whitelist.includes(origin)){
      callback(null, true);
    }else{
      callback(new Error('No tienes acceso'))
    }
  }
}

app.use(cors(options));

app.get('/',checkApiKey ,(req, res) => {
  res.send('Hello world');
});

app.post('/', (req, res) => {
  res.send('Hello world post');
});

app.listen(port, () => {
  console.log('Connected to port 5000');
});


routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorsHandler);
