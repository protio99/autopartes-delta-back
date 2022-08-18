const productsRouter = require('./productsRouter.js');
const usersRouter = require('./usersRouter.js');
const categoriesRouter = require('./categoriesRouter');

function routerApi(app) {
  app.use('/products', productsRouter);
  app.use('/users', usersRouter);
  app.use('/categories', categoriesRouter);
}

module.exports = routerApi;
