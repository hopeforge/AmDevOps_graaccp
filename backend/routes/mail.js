const express = require('express');
const mailCtrl = require('../controllers/mailController');
const router = express.Router();

const { check } = require('express-validator/check');

router.post('/send', [
    check('titulo').isLength({ min: 3 }).withMessage('titulo do e-mail inválido'),
    check('textBody').isLength({ min: 3 }).withMessage('titulo do e-mail inválido')
], mailCtrl.sendMail)

module.exports = router