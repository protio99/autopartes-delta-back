const UsersService = require('./usersService');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const service = new UsersService()
const jwt = require('jsonwebtoken');
const config = require('./../config/config')
const nodemailer = require('nodemailer');

const userMail = config.userMail
const userMailPassword = config.userMailPassword

class AuthService {
  async getUser(email, password){
    const user = await service.findByEmail(email)
    if (!user) {
       throw boom.unauthorized();       
    }
    const isMatch = await bcrypt.compare(password,user.password );
    if (!isMatch) {
        throw boom.unauthorized();        
    }
    delete user.dataValues.password;
    return user
  }

   signToken(user){
    
      const payload = {
        sub: user.id,
        role: user.idRol,
    
    }
      const token = jwt.sign(payload,config.jwtSecret)
      return {
        user,
        token
      };
  }

  async sendMail(email){
    const user = await service.findByEmail(email)
    if (!user) {
       throw boom.unauthorized();       
    }
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: userMail,
            pass: userMailPassword
        }
      });
      await transporter.sendMail({
        from: userMail, // sender address
        to: user.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
  }
}

module.exports = AuthService;
