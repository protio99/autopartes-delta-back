//ESTE ARCHIVO SE ENCARGA DE ENVIAR LA CONEXION HACIA LOS MODELOS

const {Categories, categoriesSchema} = require('./categoriesModel');
const {Brands, brandsSchema} = require('./brandsModel');
const {BuysDetails, buysDetailsSchema} = require('./buysDetailsModel');
const {Buys, buysSchema} = require('./buysModel');
const {Clients, clientsSchema} = require('./clientsModel');
const {ProductsQuotations, productsQuotationsSchema} = require('./productsQuotationsModel');
const {Modules, modulesSchema} = require('./modulesModel');
const {Quotation,quotationSchema } = require('./quotationModel');
const {Permissions, permissionsSchema} = require('./permissionsModel');
const {Products, productsSchema} = require('./productsModel');
const {ProductsSales, productsSalesSchema} = require('./productsSalesModel');
const {ProductsVehicles, productsVehiclesSchema} = require('./productsVehiclesModel');
const {Providers, providersSchema} = require('./providersModel');
const {RolesPermissions, rolesPermissionsSchema} = require('./rolesPermissionsModel');
const {Roles, rolesSchema} = require('./rolesModel');
const {Sales, salesSchema} = require('./salesModel');
const {UsersHelp, usersHelpSchema} = require('./usersHelpModel');
const {Users, usersSchema} = require('./usersModel');
const {Vehicles, vehiclesSchema} = require('./vehiclesModel');

function setupModels(sequelize) {
    Categories.init(categoriesSchema, Categories.config(sequelize));
    Brands.init(brandsSchema, Brands.config(sequelize));
    BuysDetails.init(buysDetailsSchema, BuysDetails.config(sequelize));
    Buys.init(buysSchema, Buys.config(sequelize));
    Clients.init(clientsSchema, Clients.config(sequelize));
    ProductsQuotations.init(productsQuotationsSchema, ProductsQuotations.config(sequelize));
    Modules.init(modulesSchema, Modules.config(sequelize));
    Quotation.init(quotationSchema, Quotation.config(sequelize));
    Permissions.init(permissionsSchema, Permissions.config(sequelize));
    Products.init(productsSchema, Products.config(sequelize));
    ProductsSales.init(productsSalesSchema, ProductsSales.config(sequelize));
    ProductsVehicles.init(productsVehiclesSchema, ProductsVehicles.config(sequelize));
    Providers.init(providersSchema, Providers.config(sequelize));
    RolesPermissions.init(rolesPermissionsSchema, RolesPermissions.config(sequelize));
    Roles.init(rolesSchema, Roles.config(sequelize));
    Sales.init(salesSchema, Sales.config(sequelize));
    UsersHelp.init(usersHelpSchema, UsersHelp.config(sequelize));
    Users.init(usersSchema, Users.config(sequelize));
    Vehicles.init(vehiclesSchema, Vehicles.config(sequelize));


    //Asociaciones de llaves foraneas

    UsersHelp.associate(sequelize.models);
    Modules.associate(sequelize.models);
    Categories.associate(sequelize.models);
    Vehicles.associate(sequelize.models);
    Brands.associate(sequelize.models);
    Products.associate(sequelize.models);
    Quotation.associate(sequelize.models)
   
}

module.exports = setupModels;
