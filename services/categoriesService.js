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
  async findProductsWhereCategory(idCategory) {
    const rta = await models.Products.findAll({
      attributes:{
        exclude: ['idProduct']
      },
      where: {
        idCategory: idCategory,
      },
    });
    return rta;
  }

  async changeStatusOfCategory(idCategory, data){
    let products = await this.findProductsWhereCategory(idCategory)
      const rta = await models.Categories.update(
        { status: data.status },
        { where: { id: idCategory } }      
      );
      ;
      if (data.status === false) {
        (await products).forEach((product) =>{
          const idProduct = product.id
          const response = models.Products.update(
            { state: data.status },
            { where: { id: idProduct } }      
          );
          return response
  
        })
        
      }
      return rta      
    

  }

  async findById(id) {
    const category = await models.Categories.findByPk(id);
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
