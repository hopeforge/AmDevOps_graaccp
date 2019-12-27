const express = require('express');
const parceirasCtrl = require('../controllers/parceirasController');
const router = express.Router();

const { check } = require('express-validator/check');

router.get('/all', parceirasCtrl.getParceiras);

router.post('/cadastro', [
    check('nome').isLength({ min: 3 }).withMessage('Nome de parceiro(a) inválido(a)'),
    check('endereco').isLength({ min: 4 }).withMessage('Endereco de parceiro(a) inválido(a)')
], parceirasCtrl.cadastraParceiras);

router.delete('/remove/:id', parceirasCtrl.removerParceiras);

module.exports = router