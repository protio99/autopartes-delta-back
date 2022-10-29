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
    const vehicle = await models.Vehicles.findByPk(id);
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

  async verifyStatusOfBrand(idVehicle) {
    const vehicle = await this.findById(idVehicle);
    const brand = await models.Brands.findAll({
      where: {
        id: vehicle.idBrand,
      },
    });
    return brand;
  }

  async getProductsWhereIdVehicle(idVehicle) {
    const products = await models.ProductsVehicles.findAll({
      where: {
        idVehicle: idVehicle,
      },
    });
    return products;
  }
  async findProductsWhereVehicle(idVehicle) {
    const products = this.getProductsWhereIdVehicle(idVehicle);
    let arrayOfProducts = []
    (await products).forEach((product) => {
      const idProduct = product.idProduct;
      const response = models.Products.findAll({
        attributes:{
          exclude: ['idProduct']
        },
        where: {
          id: idProduct,
        },
      });
      arrayOfProducts.push(response)
    });
    return arrayOfProducts;
  }

  async changeStatusVehicle(idVehicle, data) {
    let brand = await this.verifyStatusOfBrand(idVehicle);
    if (brand[0].status === true) {
      const rta = await models.Vehicles.update(
        { status: data.status },
        { where: { id: idVehicle } }
      );
      const products = this.getProductsWhereIdVehicle(idVehicle);
      if (data.status === false) {
        (await products).forEach((product) => {
          const idProduct = product.idProduct;
          const response = models.Products.update(
            { state: data.status },
            { where: { id: idProduct } }
          );
          return response;
        });
      }
      return rta;
    } else {
      return null;
    }
  }

  async delete(id) {
    const vehicle = await this.findById(id);
    await vehicle.destroy();
    return { id };
  }
}

module.exports = VehiclesService;
