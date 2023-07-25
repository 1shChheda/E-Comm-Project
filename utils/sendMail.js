const nodemailer = require('nodemailer');

const Send_Mail = (receiver, subject, body) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const mailOptions = {
        from: "Ecomm Shop <ecomm-shop@node.com>",
        subject: subject,
        to: receiver,
        text: body,
    };

    return transporter.sendMail(mailOptions)
        .then(info => {
            return true;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
};

module.exports = Send_Mail;