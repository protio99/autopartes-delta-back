
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')
const { Op } = require('sequelize');



class ProductsService {
  constructor() {
  
  }

  async create(data) {
    const newProduct = await models.Products.create(data);
    return newProduct;
  }
  async addVehicleToProduct(data) {
    const newVehicleToProduct = await models.ProductsVehicles.create(data);
    return newVehicleToProduct;
  }
  async updateVehiclesOfProduct(idOfProductSelected, newArrayData) {
    const products = await models.ProductsVehicles.findAll({
      where: {
        idProduct : idOfProductSelected
      }
    });
  
    await products.forEach(vehicleOfProduct => {
      vehicleOfProduct.destroy();  
      
    });
    await newArrayData.forEach(elementData => {
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
        include: ['category'],
        where: {},
      };
    const {limit, offset, price, priceMin, priceMax} = query;
    
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    if (price) {
      options.where.price = price;
      
    }
    if (priceMin && priceMax) {
      options.where.price = {
        [Op.between]: [priceMin,priceMax]
      }
      
    }

    const rta = await models.Products.findAll(options);
    return rta;

  }
  async findVehiclesOfAProduct(productId) {
    const options = {
      include: [ {
            association: 'vehicles',
            include: ['brands_vehicles']
          }],
        where: {
          idProduct: productId},
      };
    const vehiclesOfAProduct = await models.ProductsVehicles.findAll(options);
    return vehiclesOfAProduct;

  }
  async findAllVehiclesOfAProduct() {
    const vehiclesOfAProduct = await models.ProductsVehicles.findAll({include:['vehicles']});
    return vehiclesOfAProduct;

  }
  async findById(id) {
    const product = await models.Products.findByPk(id,
      {
        include: ['category']
      }
      );
    if(!product){
      throw boom.notFound('product not found')
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
    console.log("New data objet", newData)
    const newAmount = product.amount + newData.amount;
    const rta = await product.update({
      amount: newAmount,
      iva: newData.iva,
      price: newData.price
    });  
    return rta;
  }

  async discountProduct(id, newData) {
    const product = await this.findById(id);
    console.log("New data objet", newData)
    const newAmount = product.amount - newData.amount;
    const rta = await product.update({
      amount: newAmount
    });  
    return rta;
  }

  async delete(id) {
    const product = await this.findById(id);
    await product.destroy();  
    return {id};
  }
}

module.exports = ProductsService;
