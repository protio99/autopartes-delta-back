const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class ImagesProductsService {
  constructor() {
  
  }

  async create(idProduct, url) {
    console.log("dsdsd",idProduct,url );
    const newImagesProducts = await models.ImagesProducts.create({idProduct,url});
    return newImagesProducts;
  }


   async find() {
  
    const rta = await models.ImagesProducts.findAll();
    return rta;

  }

  async findById(id) {
    const imagesProducts = await models.ImagesProducts.findByPk(id);
    if(!imagesProducts){
      throw boom.notFound('imagesProducts not found')
    }
    return imagesProducts;
  }

  async update(id, newData) {
    const imagesProducts = await this.findById(id);
    const rta = await imagesProducts.update(newData);  
    return rta;
  }

  async delete(id) {
    const imagesProducts = await this.findById(id);
    await imagesProducts.destroy();  
    return {id};
  }
}

module.exports = ImagesProductsService;
