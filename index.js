const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your email',
        pass: 'your password'
    },
    tls: {
        rejectUnauthorized: false
    }
})
const app = express();
const port = process.env.port || 1996

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<h1>Selamat datang di API Nodemailer</h1>')
})

app.post('/sendmail', (req, res) => {
    var { to, subject, html } = req.body;
    var mailOptions = {
        from: "Penguasa  Popok Semesta <budiyahed@gmail.com",
        to,
        subject,
        html
    }
    transporter.sendMail(mailOptions, (err, res1) => {
        if (err) {
            console.log(err)
            res.send({ status : 'error' })
        } else {
            // console.log('success')
            console.log(res1)
            res.send({ status: "success" })
        }
    })
})

app.listen(port, () => console.log('Api aktif di port ' + port));