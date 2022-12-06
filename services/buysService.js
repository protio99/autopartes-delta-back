//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const { models } = require('../librerias/sequelize');

class BuysService {
  constructor() {}

  async create(data) {
    const newBuy = await models.Buys.create(data);
    return newBuy;
  }

  async asocciateProducts(data) {
    const newProducts = await models.BuysDetails.create(data);
    return newProducts;
  }

  async find() {
    const options = {
      include: ['provider'],
    };
    const rta = await models.Buys.findAll(options);
    return rta;
  }

  async getBuyDetailById(buyId) {
    const options = {
      include: [
        {
          association: 'products',
          attributes: { exclude: ['idProduct'] },
          // exclude: ['idProduct']
          // include: ['id','idCategory','idBrand','name','amount','price','description','state','iva']
        },
      ],
      // include: ['products']
      //   attributes: {exclude: ['idProduct'],
      //   include: ['id','idCategory','idBrand','name','amount','price','description','state','iva']
      // },
      where: {
        idBuy: buyId,
      },
    };
    const rta = await models.BuysDetails.findAll(options);
    return rta;
  }

  async findById(id) {
    const buy = await models.Buys.findByPk(id);
    if (!buy) {
      throw boom.notFound('buy not found');
    }
    return buy;
  }

  async update(id, newData) {
    const buy = await this.findById(id);
    const rta = await buy.update(newData);
    return rta;
  }
  async cancelBuy(id, reason, productsDetailOfBuy, idRol) {
    if (idRol !== 1) {
      throw boom.unauthorized('No tienes acceso a esta funcionalidad ');
    }
    const buy = await this.findById(id);
    if (!reason) {
      throw boom.badData('Los datos recibidos de la compra son incorrectos');
    }
    if (!buy) {
      throw boom.badData('No encontro la compra');
    }

    productsDetailOfBuy.forEach(async (element) => {
      const amountBuy = element.amount;
      const product = await models.Products.findByPk(element.idProduct, {
        attributes: { exclude: ['idProduct'] },
      });
      const newAmountProduct = product.dataValues.amount - amountBuy;
      await product.update({
        amount: newAmountProduct,
      });
    });

    const rta = await buy.update({
      reason: reason,
      status: false,
    });
    return rta;
  }

  async delete(id) {
    const buy = await this.findById(id);
    await buy.destroy();
    return { id };
  }
}

module.exports = BuysService;
