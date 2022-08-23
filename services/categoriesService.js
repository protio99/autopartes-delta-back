//Faker es una libreria que ayuda a generar datos aleatorios para hacer pruebas, mientras conectamos con un BD real
const dataFake = require('faker');
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const getConnection = require('./../librerias/postgres');

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
    const client = await getConnection();
    const respuesta = await client.query('SELECT * FROM categories');
    return respuesta.rows;
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
