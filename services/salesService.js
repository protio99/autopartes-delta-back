//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const { models } = require('../librerias/sequelize');
const ClientsService = require('./clientsService');
const config = require('./../config/config');
const userMail = config.userMail;
const userMailPassword = config.userMailPassword;
const nodemailer = require('nodemailer');
const _clientsService = new ClientsService();
class SalesService {
  constructor() {}

  async create(data) {
    const newSale = await models.Sales.create(data);
    return newSale;
  }

  async createFromWebSite(personalInfo, shippingInfo, cart) {
    const newClient = await _clientsService.createClient(
      personalInfo,
      shippingInfo
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
      idClient: newClient.dataValues.id,
      saleDate: this.formatDate(new Date()),
      statusSale: 'Activo',
      statusPayment: 'Pagado',
      totalPurchase: total,
      typeSale: 1,
    };

    const newSale = await this.create(sale);
    for (const product in cart) {
      const data = {
        idSale: newSale.dataValues.id,
        idProduct: product,
        amount: cart[product].amount,
        price: cart[product].price,
      };
      await models.SalesDetails.create(data);
    }
  }
  async createFromWebSiteWithToken(personalInfo, shippingInfo, cart, userId) {
    const newClient = await _clientsService.createClientWithToken(
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
      idClient: newClient.dataValues.id,
      saleDate: this.formatDate(new Date()),
      statusSale: 'Activo',
      statusPayment: 'Pagado',
      totalPurchase: total,
      typeSale: 1,
    };

    const newSale = await this.create(sale);
    for (const product in cart) {
      const data = {
        idSale: newSale.dataValues.id,
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
    let formattedDate = year + '-' + month + '-' + day;
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
  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: userMail,
        pass: userMailPassword,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'Email enviado exitosamente' };
  }

  async sendBuyConfirmation(email) {
    const mail = {
      from: userMail, // sender address
      to: email, // list of receivers
      subject: 'Confirmación pedido McPartes', // Subject line
      text: 'Hello world?', // plain text body
      html: `
      <h4>Mc Partes</h4>
      <h5>Gracias por comprar en McPartes</h5>
      <p>Estamos trabajando para que recibas tu pedido lo antes posible, por ahora te enviamos la confirmacion de tu pedido y un resumen de lo que compraste</p>
      `, // html body
    };

    const rta = await this.sendMail(mail);
    return rta;
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
