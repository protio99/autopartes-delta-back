const UsersService = require('./usersService');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const service = new UsersService();
const jwt = require('jsonwebtoken');
const config = require('./../config/config');
const nodemailer = require('nodemailer');
const userMail = config.userMail;
const userMailPassword = config.userMailPassword;
const recoveryPasswordURL = config.userBaseURL + '/ResetPasswordConfirmation';
const { models } = require('../librerias/sequelize');

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.idRol,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
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

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `${recoveryPasswordURL}/${token}`;
    await service.update(user.id, {
      recoveryToken: token,
    });
    const mail = {
      from: userMail, // sender address
      to: user.email, // list of receivers
      subject: 'Recuperación de contraseña MC Partes', // Subject line
      text: 'Hello world?', // plain text body
      html: `<b>Ingresa a este enlace para restablecer la contraseña =>  ${link}</b>`, // html body
    };

    const rta = await this.sendMail(mail);
    return rta;
  }
  async sendPQR(clientData) {
    const mail = {
      from: userMail, // sender address
      to: userMail, // list of receivers
      subject: `PQR del email ${clientData.email}`, // Subject line
      text: 'Hello world?', // plain text body
      html: `<h3><b>Información del usuario: </b></h3>
       <p><b>Nombre:</b>  ${clientData.name}</p> 
       <p><b>Apellido(s):</b> ${clientData.lastname}</p>
       <p><b>Email:</b> ${clientData.email}</p> 
       <p><b>Teléfono de contacto:</b> ${clientData.contactNumber}</p> 
       <h3><b>Mensaje:</b></h3>
       <p>${clientData.message}</p> `, // html body
    };

    const rta = await this.sendMail(mail);
    return rta;
  }
  async getUserInfo(token) {
    const payload = jwt.verify(token, config.jwtSecret);
    const userId = payload.sub;
    const user = await models.Users.findByPk(userId);
    return user;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findById(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {
        recoveryToken: null,
        password: hash,
      });
      return { message: 'Constraseña modificada exitosamente' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
