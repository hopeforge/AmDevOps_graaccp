const express = require('express');
const parceirasCtrl = require('../controllers/cuponsController');
const router = express.Router();

const { check } = require('express-validator/check');

router.get('/all', parceirasCtrl.getCupons);

router.get('/my/:token', parceirasCtrl.getUserCupons);

router.post('/acive/:token',[
    check('cuponId').isLength({ min: 3 }).withMessage('Cupom inválido(a)')
], parceirasCtrl.activeCupons);

router.post('/down',[
    check('id').isLength({ min: 3 }).withMessage('Cupom inválido(a)'),
    check('userLink').isLength({ min: 3 }).withMessage('UserLink inválido(a)'),
], parceirasCtrl.downCupon);


router.post('/cadastro', [
    check('nome').isLength({ min: 3 }).withMessage('Nome do cupon inválido(a)'),
    check('parceiras').isMongoId().withMessage('Parceira(o) do cupon inválido(a)'),
    check('data_fim').isLength({ min: 4 }).withMessage('Data cupon inválido(a)')
], parceirasCtrl.cadastraCupons);

router.post('/edit', [
    check('nome').isLength({ min: 3 }).withMessage('Nome do cupon inválido(a)'),
    check('parceiras').isMongoId().withMessage('Parceira(o) do cupon inválido(a)'),
    check('data_fim').isLength({ min: 4 }).withMessage('Data cupon inválido(a)'),
    check('id').isMongoId().withMessage('Id de atualização e inválido')
], parceirasCtrl.updateCupons);

router.delete('/remove/:id', parceirasCtrl.removerCupons);

module.exports = router