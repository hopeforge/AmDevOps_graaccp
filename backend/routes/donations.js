const express = require('express');
const donationsCtrl = require('../controllers/donationsController');
const router = express.Router();

const { check } = require('express-validator/check');

router.post('/make/:token', [
    check('valor').isLength({ min: 1 }).withMessage('Valor de doação inválido'),
], donationsCtrl.makeDonation);

router.get('/list/:token', donationsCtrl.myDonation);

module.exports = router