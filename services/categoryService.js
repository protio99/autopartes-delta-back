const dataFake = require('faker');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  create(data) {
    const newCategory = {
      id: dataFake.datatype.uuid(),
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  generate() {
    for (let index = 0; index < 10; index++) {
      this.categories.push({
        id: dataFake.datatype.uuid(),
        name: dataFake.commerce.productName(),
        price: parseInt(dataFake.commerce.price()),
        image: dataFake.image.imageUrl(),
      });
    }
  }

  find() {
    return this.categories;
  }

  findById(id) {
    return this.categories.find((category) => category.id == id);
  }

  update() {}

  delete() {}
}

module.exports = CategoriesService;
