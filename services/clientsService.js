//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const { models } = require('../librerias/sequelize');

class ClientsService {
  constructor() {}

  async createClient(personalInfo, shippingInfo) {
    const client = {
      name: personalInfo.name,
      lastname: personalInfo.lastname,
      documentType: personalInfo.documentType,
      document: personalInfo.documentNumber,
      telephone: personalInfo.telephone,
      email: personalInfo.email,
      address: shippingInfo.address,
      country: shippingInfo.country,
      department: shippingInfo.department,
      city: shippingInfo.city,
      neightboorhood: shippingInfo.neighborhood,
      indications: shippingInfo.indications,
    };

    const newClient = await models.Clients.create(client);
    return newClient;
  }
  async createClientWithToken(personalInfo, shippingInfo, userId) {
    const client = {
      idUser: userId,
      name: personalInfo.name,
      lastname: personalInfo.lastname,
      documentType: personalInfo.documentType,
      document: personalInfo.documentNumber,
      telephone: personalInfo.telephone,
      email: personalInfo.email,
      address: shippingInfo.address,
      country: shippingInfo.country,
      department: shippingInfo.department,
      city: shippingInfo.city,
      neightboorhood: shippingInfo.neighborhood,
      indications: shippingInfo.indications,
    };

    const newClient = await models.Clients.create(client);
    return newClient;
  }

  async verifyPreviousBuys(idUser) {
    const clientInfo = await models.Clients.findAll({
      limit: 1,
      where: {
        idUser: idUser,
      },
      order: [['id', 'DESC']],
    });

    return clientInfo;
  }

  // async previousBuys(idUser) {
  //   const clientInfo = await models.Clients.findAll({
  //     limit: 1,
  //     where: {
  //       idUser: idUser,
  //     },
  //     order: [['id', 'DESC']],
  //   });

  //   return clientInfo;
  // }

  async create(data) {
    const newClient = await models.Clients.create(data);
    return newClient;
  }

  async find() {
    const rta = await models.Clients.findAll({
      include: ['users'],

    });
    return rta;
  }

  async findById(id) {
    const client = await models.Clients.findByPk(id);
    if (!client) {
      throw boom.notFound('client not found');
    }
    return client;
  }

  async update(id, newData) {
    const client = await this.findById(id);
    const rta = await client.update(newData);
    return rta;
  }

  async delete(id) {
    const client = await this.findById(id);
    await client.destroy();
    return { id };
  }
}

module.exports = ClientsService;
