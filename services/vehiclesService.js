
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class VehiclesService {
  constructor() {
  
  }

  async create(data) {
    const newVehicle = await models.Vehicles.create(data);
    return newVehicle;
  }


   async find() {
  
    const rta = await models.Vehicles.findAll({
      include: ['brands_vehicles']
    });
    return rta;

  }

  async findById(id) {
    const vehicle = await models.Vehicles.findByPk(id);
    if(!vehicle){
      throw boom.notFound('vehicle not found')
    }
    return vehicle;
  }

  async update(id, newData) {
    const vehicle = await this.findById(id);
    const rta = await vehicle.update(newData);  
    return rta;
  }

  async delete(id) {
    const vehicle = await this.findById(id);
    await vehicle.destroy();  
    return {id};
  }
}

module.exports = VehiclesService;
