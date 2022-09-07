
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('./../librerias/sequelize')



class CategoriesService {
  constructor() {
  
  }

  async create(data) {
    const newCategorie = await models.Categories.create(data);
    return newCategorie;
  }


   async find() {
  
    const rta = await models.Categories.findAll();
    return rta;

  }

  async findById(id) {
    const category = await models.Categories.findByPk(id, {
      include: ['products_categories']
    });
    if(!category){
      throw boom.notFound('category not found')
    }
    return category;
  }

  async update(id, newData) {
    const category = await this.findById(id);
    const rta = await category.update(newData);  
    return rta;
  }

  async delete(id) {
    const category = await this.findById(id);
    await category.destroy();  
    return {id};
  }
}

module.exports = CategoriesService;
