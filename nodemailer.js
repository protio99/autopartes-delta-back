"use strict";
const nodemailer = require("nodemailer");
const config = require('./config/config')

const userMail = config.userMail
const userMailPassword = config.userMailPassword
// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: userMail,
        pass: userMailPassword
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: userMail, // sender address
    to: "daniela.correa10@misena.edu.co", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail()
