var express = require('express');
var router = express.Router();
let nodemailer = require('nodemailer')
let dotenv = require('dotenv');
// handle env
dotenv.config();
// Defualt Email Sender
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
/* GET home page. */
router.post('/', (req, res) => {
    const {to, subject, text } = req.body;
    const mailData = {
        from: 'meassoknoy010@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: `<b>Hey there!</b><br> This is our first message sent with Nodemailer to ${req.body.to}<br/>`,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});



module.exports = router;
