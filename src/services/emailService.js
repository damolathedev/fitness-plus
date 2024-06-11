require('dotenv').config()
const nodemailer = require('nodemailer')
const { BadRequestError } = require('../errors');

async function sendEmail (to, subject, body) {


        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                //using dommy email and password gottenfrom ethereal.email
                //users:'alejandrin.koss59@ethereal.email',
                //pass:'qqQJfmsuNBAShf9eUq'
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: body
        });

        return info;
}

module.exports = sendEmail;
