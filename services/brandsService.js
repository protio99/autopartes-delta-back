
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class BrandsService {
  constructor() {
  
  }

  async create(data) {
    const newBrand = await models.Brands.create(data);
    return newBrand;
  }


   async find() {
  
    const rta = await models.Brands.findAll();
    return rta;

  }

  async findVehiclesWhereBrand(idBrand) {
  
    const rta = await models.Vehicles.findAll(
      {
        where : {
          idBrand: idBrand
        }
      }
    );
    return rta;

  }

  async changeStatusOfBrand(id, status) {
    const brand = await this.findById(id);
    const vehiclesWhereBrand = await this.findVehiclesWhereBrand(id)
    if (vehiclesWhereBrand) {
      const rta = await brand.update(status);
      await vehiclesWhereBrand.forEach((vehicle) =>{
        const rtaVehicles =  vehicle.update(status); 
        return rtaVehicles 
      })  

      return rta;
      
    }
  }

  async findById(id) {
    const brand = await models.Brands.findByPk(id);
    if(!brand){
      throw boom.notFound('brand not found')
    }
    return brand;
  }

  async update(id, newData) {
    const brand = await this.findById(id);
    const rta = await brand.update(newData);  
    return rta;
  }

  async delete(id) {
    const brand = await this.findById(id);
    await brand.destroy();  
    return {id};
  }
}

module.exports = BrandsService;
