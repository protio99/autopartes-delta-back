//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const { models } = require('../librerias/sequelize');

class BrandsService {
  constructor() {}

  async create(data) {
    const newBrand = await models.Brands.create(data);
    return newBrand;
  }

  async find() {
    const rta = await models.Brands.findAll();
    return rta;
  }

  async findVehiclesWhereBrand(idBrand) {
    const rta = await models.Vehicles.findAll({
      where: {
        idBrand: idBrand,
      },
    });
    return rta;
  }

  async findProductsOfVehiclesWhereBrand(idVehicle) {
    const rta = await models.Products.findAll({
      where: {
        idVehicle: idVehicle,
      },
    });
    return rta;
  }
  async findProductsVehiclesWhere(idVehicle) {
    const rta = await models.ProductsVehicles.findAll({
      where: {
        idVehicle: idVehicle,
      },
    });
    return rta;
  }

  async changeStatusOfBrand(id, data) {
    const vehiclesWhereBrand = await this.findVehiclesWhereBrand(id);
    const rta = await models.Brands.update(
      { status: data.status },
      { where: { id: id } }
    );
    if (vehiclesWhereBrand && data.status === false) {
      await vehiclesWhereBrand.forEach((vehicle) => {
        // const productsVehicle = this.findProductsVehiclesWhere(vehicle.id);
        const rtaVehicles = models.Vehicles.update(
          { status: data.status },
          { where: { id: vehicle.id } }
        );
        // if (productsVehicle) {
        //   productsVehicle.forEach((productVehicle) => {
        //     const productId = productVehicle.idProduct;
        //     const rtaProducts = models.Products.update(
        //       { state: data.status },
        //       { where: { id: productId } }
        //     );
        //     return rtaProducts;
        //   });
        // }
        return  rtaVehicles;
      });

      return rta;
    }
  }

  async findById(id) {
    const brand = await models.Brands.findByPk(id);
    if (!brand) {
      throw boom.notFound('brand not found');
    }
    return brand;
  }

  async update(id, newData) {
    const brand = await this.findById(id);
    const rta = await brand.update(newData);
    return rta;
  }

  async delete(id) {
    const brand = await this.findById(id);
    await brand.destroy();
    return { id };
  }
}

module.exports = BrandsService;
