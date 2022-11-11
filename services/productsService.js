
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
        include: ['category', 'brand'],
        attributes: {exclude: ['idProduct']},
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

  async verifyChangeStatusProduct(productId){
    const vehiclesWhereProduct = await models.ProductsVehicles.findAll({
      where: {
        idProduct: productId
      }})
    const verifyVehicles = vehiclesWhereProduct.map((vehicle) => {
      if (vehicle.status) {
        return vehicle.status
        
      }else{
        return false
      }
    })
    const product = await this.findById(productId)
    const statusBrand = product.brand.status
    const statusCategory = product.category.status
 
    if (!statusBrand) {
      return false
      
    } else if (!statusCategory) {
      return false
      
    }
    else if (!verifyVehicles.includes(false)) {
      return false
      
    }else{
      return true
    }
    
  }

  async changeStatusOfProduct(productId, data) {
  
    const validation = await this.verifyChangeStatusProduct(productId)
    //Validacion para activar el producto validation=true, data.status=true (porque se va a activar el producto) y el estado actual product.status debe ser igual a false
    if (validation) {
      const response = models.Products.update(
        { state: data.status },
        { where: { id: productId } }
      );
      return response
      
    //Desactivar producto
    }else{
      return null
    }

  }

  
  async findAllVehiclesOfAProduct() {
    const vehiclesOfAProduct = await models.ProductsVehicles.findAll({include:['vehicles']});
    return vehiclesOfAProduct;

  }
  async findById(id) {
    const product = await models.Products.findByPk(id,
      {
        include: ['category', 'brand'],
        attributes: {exclude: ['idProduct']},

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
