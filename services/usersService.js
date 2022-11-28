
//Boom es una libreria que ayuda a manejar los middleware HttpErrors de una forma mas sencilla
const boom = require('@hapi/boom');
const {models} = require('../librerias/sequelize')
const bcrypt = require('bcrypt');



class UsersService {
  constructor() {
  
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password,10);
    const newUser = await models.Users.create({
      attributes: {exclude: ['roles_users'] },
      ...data,
      password:hash
    });
    delete newUser.dataValues.password;
    return newUser;
  }


  async find() {
  
    const rta = await models.Users.findAll(
      
      {
      include:['roles_users'] 
      }
     
    );
    return rta;

  }
  async findByEmail(email) {
 
   const rta = await models.Users.findOne({
    where: { email }
   });
   return rta;

 }

  async findById(id) {
    const user = await models.Users.findByPk(id);
    if(!user){
      throw boom.notFound('user not found')
    }
    return user;
  }

  async update(id, newData) {
    const user = await this.findById(id);
    const rta = await user.update(newData);  
    
    return rta;
  }

  async delete(id) {
    const user = await this.findById(id);
    await user.destroy();  
    return {id};
  }
}

module.exports = UsersService;
