const brandsRouter = require('./brandsRouter.js');
const buysDetailsRouter = require('./buysDetailsRouter.js');
const buysRouter = require('./buysRouter.js');
const categoriesRouter = require('./categoriesRouter.js');
const clientsRouter = require('./clientsRouter.js');
const modulesRouter = require('./modulesRouter.js');
const quotationRouter = require('./quotationRouter');
const permissionsRouter = require('./permissionsRouter.js');
const productsRouter = require('./productsRouter.js');
const productsSalesRouter = require('./productsSalesRouter.js');
const productsVehiclesRouter = require('./productsVehiclesRouter.js');
const providersRouter = require('./providersRouter.js');
const rolesPermissionsRouter = require('./rolesPermissionsRouter.js');
const rolesRouter = require('./rolesRouter.js');
const salesRouter = require('./salesRouter.js');
const usersHelpRouter = require('./usersHelpRouter');
const usersRouter = require('./usersRouter.js');
const vehiclesRouter = require('./vehiclesRouter.js');
const authRouter = require('./authRouter');

function routerApi(app) {

  app.use('/brands', brandsRouter);
  app.use('/buysDetails', buysDetailsRouter);
  app.use('/buys', buysRouter);
  app.use('/categories', categoriesRouter);
  app.use('/clients', clientsRouter);
  app.use('/modules', modulesRouter);
  app.use('/quotations', quotationRouter);
  app.use('/permissions', permissionsRouter);
  app.use('/products', productsRouter);
  app.use('/productsSales', productsSalesRouter);
  app.use('/productsVehicles', productsVehiclesRouter);
  app.use('/providers', providersRouter);
  app.use('/rolesPermissions', rolesPermissionsRouter);
  app.use('/roles', rolesRouter);
  app.use('/sales', salesRouter);
  app.use('/usersHelp', usersHelpRouter);
  app.use('/users', usersRouter);
  app.use('/vehicles', vehiclesRouter);
  app.use('/auth', authRouter);
}

module.exports = routerApi;
