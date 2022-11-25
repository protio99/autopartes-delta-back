//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const { models } = require('../librerias/sequelize');

class SalesService {
  constructor() {}

  async create(data) {
    const newSale = await models.Sales.create(data);
    return newSale;
  }

  async createFromWebSite(personalInfo, shippingInfo, userId, cart) {
    const newClient = await models.Clients.createClient(
      personalInfo,
      shippingInfo,
      userId
    );

    if (!newClient) {
      throw boom.badRequest(
        'error al crear el cliente desde el servicio de ventas'
      );
    }
    let total = 0;
    for (const product in cart) {
      if (Object.hasOwnProperty.call(cart, product)) {
        const element = cart[product];
        total += element.price;
      }
    }
    const sale = {
      idClient: newClient.id,
      saleDate: this.formatDate(new Date()),
      statusSale: 'Activo',
      statusPayment: 'Pagado',
      totalPurchase: total,
      typeSale: 1,
    };

    const newSale = this.create(sale);
    for (const product in cart) {
      const data = {
        idSale: newSale.id,
        idProduct: product,
        amount: cart[product].amount,
        price: cart[product].price,
      };
      await models.SalesDetails.create(data);
    }
  }

  formatDate(date) {
    // Get year, month, and day part from the date
    let year = date.toLocaleString('default', { year: 'numeric' });
    let month = date.toLocaleString('default', { month: '2-digit' });
    let day = date.toLocaleString('default', { day: '2-digit' });

    // Generate yyyy-mm-dd date string
    let formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
  }

  async find() {
    const rta = await models.Sales.findAll();
    return rta;
  }

  async asocciateProducts(data) {
    const newProducts = await models.SalesDetails.create(data);
    return newProducts;
  }

  async getSaleDetailById(saleId) {
    const options = {
      include: {
        association: 'products',
        attributes: [
          'id',
          'idCategory',
          'idBrand',
          'name',
          'amount',
          'price',
          'description',
          'state',
          'iva',
        ],
        // attributes:  { exclude: ['idProduct'] }
      },
      where: {
        idSale: saleId,
      },
    };
    const rta = await models.SalesDetails.findAll(options);
    return rta;
  }

  async findById(id) {
    const sale = await models.Sales.findByPk(id);
    if (!sale) {
      throw boom.notFound('sale not found');
    }
    return sale;
  }

  async update(id, newData) {
    const sale = await this.findById(id);
    const rta = await sale.update(newData);
    return rta;
  }

  async delete(id) {
    const sale = await this.findById(id);
    await sale.destroy();
    return { id };
  }
}

module.exports = SalesService;
