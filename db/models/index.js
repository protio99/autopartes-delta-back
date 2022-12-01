//ESTE ARCHIVO SE ENCARGA DE ENVIAR LA CONEXION HACIA LOS MODELOS

const { Categories, categoriesSchema } = require('./categoriesModel');
const { Brands, brandsSchema } = require('./brandsModel');
const { BuysDetails, buysDetailsSchema } = require('./buysDetailsModel');
const { Buys, buysSchema } = require('./buysModel');
const { Clients, clientsSchema } = require('./clientsModel');
const {
  QuotationsDetails,
  quotationsDetailsSchema,
} = require('./quotationsDetailsModel');
const { Modules, modulesSchema } = require('./modulesModel');
const { Quotation, quotationSchema } = require('./quotationModel');
const { Products, productsSchema } = require('./productsModel');
const { SalesDetails, salesDetailsSchema } = require('./salesDetailsModel');
const { Providers, providersSchema } = require('./providersModel');
const {
  RolesPermissions,
  rolesPermissionsSchema,
} = require('./rolesPermissionsModel');
const { Roles, rolesSchema } = require('./rolesModel');
const { Sales, salesSchema } = require('./salesModel');
const { UsersHelp, usersHelpSchema } = require('./usersHelpModel');
const { Users, usersSchema } = require('./usersModel');
const { Vehicles, vehiclesSchema } = require('./vehiclesModel');
const { Orders, ordersSchema } = require('./ordersModel');
const { OrdersDetails, ordersDetailsSchema } = require('./ordersDetailsModel');
const {
  ProductsVehicles,
  productsVehiclesSchema,
} = require('./productsVehiclesModel');
const {
  ProductsBrands,
  productsBrandsSchema,
} = require('./productsBrandsModel');
const {
  ImagesProducts,
  imagesProductsSchema,
} = require('./imagesProductsModel');

function setupModels(sequelize) {
  Categories.init(categoriesSchema, Categories.config(sequelize));
  Brands.init(brandsSchema, Brands.config(sequelize));
  BuysDetails.init(buysDetailsSchema, BuysDetails.config(sequelize));
  Buys.init(buysSchema, Buys.config(sequelize));
  Clients.init(clientsSchema, Clients.config(sequelize));
  QuotationsDetails.init(
    quotationsDetailsSchema,
    QuotationsDetails.config(sequelize)
  );
  Modules.init(modulesSchema, Modules.config(sequelize));
  Quotation.init(quotationSchema, Quotation.config(sequelize));
  Products.init(productsSchema, Products.config(sequelize));
  SalesDetails.init(salesDetailsSchema, SalesDetails.config(sequelize));
  Providers.init(providersSchema, Providers.config(sequelize));
  RolesPermissions.init(
    rolesPermissionsSchema,
    RolesPermissions.config(sequelize)
  );
  Roles.init(rolesSchema, Roles.config(sequelize));
  Sales.init(salesSchema, Sales.config(sequelize));
  UsersHelp.init(usersHelpSchema, UsersHelp.config(sequelize));
  Users.init(usersSchema, Users.config(sequelize));
  Vehicles.init(vehiclesSchema, Vehicles.config(sequelize));
  Orders.init(ordersSchema, Orders.config(sequelize));
  OrdersDetails.init(ordersDetailsSchema, OrdersDetails.config(sequelize));
  ProductsVehicles.init(
    productsVehiclesSchema,
    ProductsVehicles.config(sequelize)
  );
  ProductsBrands.init(productsBrandsSchema, ProductsBrands.config(sequelize));
  ImagesProducts.init(imagesProductsSchema, ImagesProducts.config(sequelize));
  //Asociaciones de llaves foraneas

  UsersHelp.associate(sequelize.models);
  Modules.associate(sequelize.models);
  Categories.associate(sequelize.models);
  Vehicles.associate(sequelize.models);
  Brands.associate(sequelize.models);
  Products.associate(sequelize.models);
  Buys.associate(sequelize.models);
  BuysDetails.associate(sequelize.models);
  Clients.associate(sequelize.models);
  Orders.associate(sequelize.models);
  OrdersDetails.associate(sequelize.models);
  Providers.associate(sequelize.models);
  Quotation.associate(sequelize.models);
  QuotationsDetails.associate(sequelize.models);
  Roles.associate(sequelize.models);
  RolesPermissions.associate(sequelize.models);
  Sales.associate(sequelize.models);
  SalesDetails.associate(sequelize.models);
  Users.associate(sequelize.models);
  ProductsVehicles.associate(sequelize.models);
  ProductsBrands.associate(sequelize.models);
  ImagesProducts.associate(sequelize.models);
}

module.exports = setupModels;
