const brandsRouter = require('./brandsRouter.js');
const buysDetailsRouter = require('./buysDetailsRouter.js');
const buysRouter = require('./buysRouter.js');
const categoriesRouter = require('./categoriesRouter.js');
const clientsRouter = require('./clientsRouter.js');
const modulesRouter = require('./modulesRouter.js');
const quotationsDetailsRouter = require('./quotationsDetailsRouter');
const productsRouter = require('./productsRouter.js');
const productsSalesRouter = require('./productsSalesRouter.js');
const providersRouter = require('./providersRouter.js');
const rolesPermissionsRouter = require('./rolesPermissionsRouter.js');
const rolesRouter = require('./rolesRouter.js');
const salesRouter = require('./salesRouter.js');
const usersHelpRouter = require('./usersHelpRouter');
const usersRouter = require('./usersRouter.js');
const vehiclesRouter = require('./vehiclesRouter.js');
const authRouter = require('./authRouter');
const productsBrandsRouter = require('./productsBrandsRouter');
const imagesProductsRouter = require('./imagesProductsRouter');
const filesBuysRouter = require('./filesBuysRouter');
const dashboardRouter = require('./dashboardRouter');

function routerApi(app) {
  app.use('/brands', brandsRouter);
  app.use('/buysDetails', buysDetailsRouter);
  app.use('/buys', buysRouter);
  app.use('/categories', categoriesRouter);
  app.use('/clients', clientsRouter);
  app.use('/modules', modulesRouter);
  app.use('/quotationsDetails', quotationsDetailsRouter);
  app.use('/products', productsRouter);
  app.use('/productsSales', productsSalesRouter);
  app.use('/providers', providersRouter);
  app.use('/rolesPermissions', rolesPermissionsRouter);
  app.use('/dashboard', dashboardRouter);
  app.use('/roles', rolesRouter);
  app.use('/sales', salesRouter);
  app.use('/usersHelp', usersHelpRouter);
  app.use('/users', usersRouter);
  app.use('/vehicles', vehiclesRouter);
  app.use('/auth', authRouter);
  app.use('/productsBrands', productsBrandsRouter);
  app.use('/imagesProducts', imagesProductsRouter);
  app.use('/filesBuys', filesBuysRouter);
}

module.exports = routerApi;
