const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class FilesBuysService {
  constructor() {
  
  }

  async create(idBuy, url) {
    const data = {
      idBuy: idBuy,
      url: url
    }
    const newFilesBuys = await models.FilesBuys.create(data);
    return newFilesBuys;
  }


   async find() {
  
    const rta = await models.FilesBuys.findAll();
    return rta;

  }

  async findByProductId(idBuy) {
  
    const rta = await models.FilesBuys.findAll({
      where: {
        idBuy: idBuy
        
      }
    });
    return rta;

  }

  async findById(id) {
    const filesBuys = await models.FilesBuys.findByPk(id);
    if(!filesBuys){
      throw boom.notFound('filesBuys not found')
    }
    return filesBuys;
  }

  async update(id, newData) {
    const filesBuys = await this.findById(id);
    const rta = await filesBuys.update(newData);  
    return rta;
  }

  async delete(id) {
    const filesBuys = await this.findById(id);
    await filesBuys.destroy();  
    return {id};
  }
}

module.exports = FilesBuysService;
