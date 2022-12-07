//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const { models } = require('../librerias/sequelize');

class VehiclesService {
  constructor() {}

  async create(data) {
    const newVehicle = await models.Vehicles.create(data);
    return newVehicle;
  }

  async find() {
    const rta = await models.Vehicles.findAll({
      include: ['brands_vehicles'],
    });
    return rta;
  }

  async findById(id) {
    const vehicle = await models.Vehicles.findByPk(id, {
      include: ['brands_vehicles'],
    });
    if (!vehicle) {
      throw boom.notFound('vehicle not found');
    }
    return vehicle;
  }

  async update(id, newData) {
    const vehicle = await this.findById(id);
    const rta = await vehicle.update(newData);
    return rta;
  }

  async getBrandByVehicle(idVehicle) {
    const vehicle = await this.findById(idVehicle);
    const brands = await models.Brands.findAll({
      where: {
        id: vehicle.idBrand,
      },
    });
    return brands[0];
  }

  async getProductsWhereIdVehicle(idVehicle) {
    const products = await models.ProductsVehicles.findAll({
      where: {
        idVehicle: idVehicle,
      },
    });
    return products;
  }
  async findProduct(idProduct) {
    const response = await models.Products.findAll({
      attributes: {
        exclude: ['idProduct'],
      },
      where: {
        id: idProduct,
      },
    });
    return response[0];
  }
  async findProductsWhereVehicle(idVehicle) {
    // const products = this.getProductsWhereIdVehicle(idVehicle);
    const products = await models.ProductsVehicles.findAll({
      where: {
        idVehicle: idVehicle,
      },
    });
    let arrayOfProducts = [];
    for (const p of products) {
      const idProduct = p.idProduct;
      const product = await this.findProduct(idProduct);
      arrayOfProducts.push(product);
    }

    return arrayOfProducts;
  }
  async findVehiclesWhereProduct(idProduct) {
    const vehicles = await models.ProductsVehicles.findAll({
      where: {
        idProduct: idProduct,
      },
    });
    let arrayOfVehicles = [];
    for (const p of vehicles) {
      const idVehicle = p.idVehicle;
      const vehicle = await this.findById(idVehicle);
      arrayOfVehicles.push(vehicle);
    }

    return arrayOfVehicles;
  }
  async getAllVehiclesByIDProduct(idProduct) {
    const rta = await models.ProductsVehicles.findAll({
      include: ['vehicles'],
      where: {
        idProduct,
      },
    });
    return rta;
  }
  async changeStatusVehicle(idVehicle, data) {
    let brand = await this.getBrandByVehicle(idVehicle);
    if (brand.status === false && data.status === true) {
      return null;
    }
    const rta = await models.Vehicles.update(
      { status: data.status },
      { where: { id: idVehicle } }
    );
    const products = await this.getProductsWhereIdVehicle(idVehicle);

    if (data.status === false) {
      products.forEach(async (product) => {
        console.log('fafsdfsdfsd', product);
        const vehicles = await this.getAllVehiclesByIDProduct(
          product.dataValues.idProduct
        );
        if (!vehicles.some((v) => v.dataValues.vehicles.status === true)) {
          await models.Products.update(
            { state: data.status },
            { where: { id: product.dataValues.idProduct } }
          );
        }
      });
    }
    return rta;
  }

  async delete(id) {
    const vehicle = await this.findById(id);
    await vehicle.destroy();
    return { id };
  }
}

module.exports = VehiclesService;
