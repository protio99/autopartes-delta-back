
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
// const boom = require('@hapi/boom');
const sequelize = require('./../librerias/sequelize')


class CategoriesService {
  constructor() {
    // this.categories = [];
    // this.generate();
    
 
  }

  create(data) {
    // const newCategory = {
    //   id: dataFake.datatype.uuid(),
    //   ...data,
    // };
    // this.categories.push(newCategory);
    // return newCategory;
    return data;
  }

  // generate() {
  //   for (let index = 0; index < 10; index++) {
  //     this.categories.push({
  //       id: dataFake.datatype.uuid(),
  //       name: dataFake.commerce.productName(),
  //     });
  //   }
  // }

   async find() {
    
    // return new Promise((resolve, reject)=>{
    // const query = 'SELECT * FROM categories;';
    // pool.query(query,(err, rows) => {
    //   if (err) reject(err)
    //   resolve(rows)    
    // })
    // })
    const query = 'SELECT * FROM categories;';
    const [data] = await sequelize.query(query);
    return data;

  }

  // async findById(id) {
  //   const product = this.categories.find((category) => category.id == id);
  //   if (!product) {
  //     throw boom.notFound('Category not found');
  //   }
  //   return product;
  // }

  // async update(id, newData) {
  //   const index = this.categories.findIndex((category) => category.id == id);
  //   if (index === -1) {
  //     throw boom.notFound('Category not found');
  //   }
  //   const category = this.categories[index];
  //   this.categories[index] = {
  //     ...category,
  //     ...newData,
  //   };
  //   return this.categories[index];
  // }

  // async delete(id) {
  //   const index = this.categories.findIndex((category) => category.id == id);
  //   if (index === -1) {
  //     throw boom.notFound('Category not found');
  //   }
  //   this.categories.splice(index, 1);
  //   return { id };
  // }
}

module.exports = CategoriesService;
