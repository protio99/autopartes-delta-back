const boom = require('@hapi/boom');
const { models } = require('../librerias/sequelize');

class ProductsBrandsService {
  constructor() {}

  async create(data) {
    const newProductsBrands = await models.ProductsBrands.create(data);
    return newProductsBrands;
  }

  async find() {
    const rta = await models.ProductsBrands.findAll();
    return rta;
  }

  async findProductsWhereBrand(idBrand) {
    const rta = await models.Products.findAll({
      attributes: {
        exclude: ['idProduct'],
      },
      where: {
        idBrand: idBrand,
      },
    });
    return rta;
  }

  async changeStatusOfBrand(id, data) {
    const productsWhereBrand = await this.findProductsWhereBrand(id);
    const rta = await models.ProductsBrands.update(
      { status: data.status },
      { where: { id: id } }
    );
    if (data.status === false) {
      await productsWhereBrand.forEach((Products) => {
        const rtaProducts = models.Products.update(
          { state: data.status },
          { where: { id: Products.id } }
        );
        return rtaProducts;
      });

      return rta;
    }
  }
  async findById(id) {
    const productsbrands = await models.ProductsBrands.findByPk(id);
    if (!productsbrands) {
      throw boom.notFound('productsbrands not found');
    }
    return productsbrands;
  }

  async update(id, newData) {
    const productsbrands = await this.findById(id);
    const rta = await productsbrands.update(newData);
    return rta;
  }

  async delete(id) {
    const productsbrands = await this.findById(id);
    await productsbrands.destroy();
    return { id };
  }
}

module.exports = ProductsBrandsService;
