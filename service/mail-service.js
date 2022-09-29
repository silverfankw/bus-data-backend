const { NODEMAILER_SERVICE, NODEMAILER_USER, NODEMAILER_PASS } = process.env;

const nodemailer = require("nodemailer")
const { printInfo, printError } = require("../util/logger")

const transporter = nodemailer.createTransport({
  service: NODEMAILER_SERVICE,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS
  }
})

const mailOptions = {
  from: NODEMAILER_USER,
  to: 'silverfankw@gmail.com',
  subject: 'Default Subject',
  text: 'Default Content'
}

const sendMail = (to = "silverfankw@gmail.com", subject, text) => transporter.sendMail(
  {...mailOptions, to, subject, text}, 
  (error, info) => {
  if (error) printError(error);
  else printInfo(`Email sent successfully to ${to}. MessageID: ${info.messageId}`)
})


module.exports = { sendMail }