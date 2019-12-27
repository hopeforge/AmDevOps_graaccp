const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const levelRouter = require('./routes/level');
const parceirasRouter = require('./routes/parceiras');
const cuposnRouter = require('./routes/cupons');
const donationsnRouter = require('./routes/donations');
const mail = require('./routes/mail');
const files = require("./routes/file");

const cors = require('cors');
const app = express();

const loginRequired = require("./middlewares/loginRequired");

app.use(cors());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
})

app.use(bodyParser.json({ limit: '9950mb' }));
app.use(bodyParser.urlencoded({
	limit: '9950mb',
	extended: false
}));

app.use('/file', files);
app.use('/api', apiRouter);
app.use('/level', levelRouter);
app.use('/parceiras', loginRequired, parceirasRouter);
app.use('/cupons', loginRequired, cuposnRouter);
app.use('/donation', donationsnRouter);
app.use('/mail', loginRequired, mail);

module.exports = app