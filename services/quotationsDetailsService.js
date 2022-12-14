
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')



class QuotationsDetailsService {
  constructor() {
  
  }

  async create(idUser, data) {
    const quotation = {
      idProduct: data.id,
      idUser: idUser,
      amount: data.amount
    }
    const newQuotation = await models.QuotationsDetails.create(quotation);
    return newQuotation;
  }

  async updateQuotation(idUser, quotationData){
    const quotationsUser = this.getQuotationByIdUser(idUser)
    if (quotationsUser) {
      this.delete(idUser).then(()=>{
        Object.values(quotationData).forEach((value) =>{
          this.create(idUser, value)
        })
      })
    }
    

  }
  
  async delete(id) {
    await models.QuotationsDetails.destroy({
      where: {
        idUser: id
      }
    });  
    return {id};
  }

  async getQuotationByIdUser(idUser){
    const rta = await models.QuotationsDetails.findAll({
      include: ['user', {
        model: models.Products,
        as: 'products',
        attributes: ['price']
        }],
      where: {
        idUser: idUser
      }
    });
    return rta
  }
  
   async find() {
    const rta = await models.QuotationsDetails.findAll({
      include: ['user','products']
    });
    return rta;

  }

  async findById(id) {
    const quotation = await models.QuotationsDetails.findByPk(id);
    if(!quotation){
      throw boom.notFound('Quotation not found')
    }
    return quotation;
  }

  async update(id, newData) {
    const quotation = await this.findById(id);
    const rta = await quotation.update(newData);  
    return rta;
  }

  async deleteOne(id) {
    const quotation = await this.findById(id);
    await quotation.destroy();  
    return {id};
  }
}

module.exports = QuotationsDetailsService;
