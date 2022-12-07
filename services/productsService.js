//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const { models } = require('../librerias/sequelize');
const { Op } = require('sequelize');
const CategoriesService = require('./categoriesService');
const ProductsBrandsService = require('./productsBrandsService');

const _categoriesService = new CategoriesService();
const _productsService = new ProductsBrandsService();
class ProductsService {
  async create(data) {
    const brandId = data.idBrand;
    const categoryId = data.idCategory;

    let categoryData = await _categoriesService.findById(brandId);
    let brandData = await _productsService.findById(categoryId);

    if (!categoryData.status || !brandData.status) {
      let newData = {
        ...data,
        state: false,
      };
      const newProduct = await models.Products.create(newData);
      return newProduct;
    } else if (categoryData.status && brandData.status) {
      const newProduct = await models.Products.create(data);
      return newProduct;
    }
  }
  async addVehicleToProduct(data) {
    const newVehicleToProduct = await models.ProductsVehicles.create(data);
    return newVehicleToProduct;
  }
  async updateVehiclesOfProduct(idOfProductSelected, newArrayData) {
    const products = await models.ProductsVehicles.findAll({
      where: {
        idProduct: idOfProductSelected,
      },
    });

    await products.forEach((vehicleOfProduct) => {
      vehicleOfProduct.destroy();
    });
    await newArrayData.forEach((elementData) => {
      models.ProductsVehicles.create(elementData);
    });
  }

  async find(query) {
    // const options = {
    //   include: [ {
    //     association: 'vehicle',
    //     include: ['brands_vehicles']
    //   }, 'category'],
    //   where: {},
    // };
    const options = {
      include: ['category', 'brand', 'images_products'],
      attributes: { exclude: ['idProduct'] },
      where: {},
    };
    const { limit, offset, price, priceMin, priceMax } = query;

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    if (price) {
      options.where.price = price;
    }
    if (priceMin && priceMax) {
      options.where.price = {
        [Op.between]: [priceMin, priceMax],
      };
    }

    const rta = await models.Products.findAll(options);
    return rta;
  }

  async findStore() {
    const options = {
      include: [
        'category',
        'brand',
        'images_products',
        {
          association: 'products_vehicles',
          include: ['vehicles'],
        },
      ],
      attributes: { exclude: ['idProduct'] },
      where: {
        [Op.and]: [
          {
            price: {
              [Op.gt]: 0,
            },
          },
          {
            amount: {
              [Op.gt]: 0,
            },
            state: {
              [Op.not]: false,
            },
          },
        ],
      },
    };
    const rta = await models.Products.findAll(options);
    return rta;
  }
  async findVehiclesOfAProduct(productId) {
    const options = {
      include: [
        {
          association: 'vehicles',
          include: ['brands_vehicles'],
        },
      ],
      where: {
        idProduct: productId,
      },
    };
    const vehiclesOfAProduct = await models.ProductsVehicles.findAll(options);
    return vehiclesOfAProduct;
  }

  async verifyChangeStatusProduct(productId) {
    const product = await this.findById(productId);
    const statusBrand = product.brand.status;
    if (!statusBrand) {
      return false;
    }
    const statusCategory = product.category.status;

    if (!statusCategory) {
      return false;
    }

    const vehiclesWhereProduct = await models.ProductsVehicles.findAll({
      include: ['vehicles'],
      where: {
        idProduct: productId,
      },
    });
    const thereAreSomeActiveVehicle = vehiclesWhereProduct.some(
      // some method return a boolean value
      (produtVehicle) => {
        return produtVehicle.vehicles.status === true;
      }
    );
    if (!thereAreSomeActiveVehicle) {
      return false;
    }
    return true;
  }

  async changeStatusOfProduct(productId, data) {
    const validation = await this.verifyChangeStatusProduct(productId);
    if (validation) {
      const response = models.Products.update(
        { state: data.status },
        { where: { id: productId } }
      );
      return response;

      //Desactivar producto
    } else {
      return null;
    }
  }

  async findAllVehiclesOfAProduct() {
    const vehiclesOfAProduct = await models.ProductsVehicles.findAll({
      include: ['vehicles'],
    });
    return vehiclesOfAProduct;
  }
  async findById(id) {
    const product = await models.Products.findByPk(id, {
      include: ['category', 'brand', 'images_products'],
      attributes: { exclude: ['idProduct'] },
    });
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, newData) {
    const product = await this.findById(id);
    const rta = await product.update(newData);
    return rta;
  }

  async updateFromBuy(id, newData) {
    const product = await this.findById(id);
    const newAmount = product.amount + newData.amount;
    const rta = await product.update({
      amount: newAmount,
      iva: newData.iva,
      price: newData.price,
    });
    return rta;
  }

  async discountProduct(id, newData) {
    const product = await this.findById(id);
    const newAmount = product.amount - newData.amount;
    const rta = await product.update({
      amount: newAmount,
    });
    return rta;
  }

  async delete(id) {
    const product = await this.findById(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;
