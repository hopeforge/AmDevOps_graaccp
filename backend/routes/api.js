const express = require('express');
const apiCtrl = require('../controllers/apiController');
const router = express.Router();

const { check } = require('express-validator/check');

router.post('/login', [
    check('password').isLength({ min: 5 }).withMessage('A senha deve conter 5 digitos'),
    check('email').isEmail().withMessage('Formato de e-mail inválido')
], apiCtrl.loginUser)

router.post('/changepwd', [
    check('password').isLength({ min: 5 }).withMessage('A senha deve conter 5 digitos'),
    check('passwordOld').isLength({ min: 5 }).withMessage('A senha deve conter 5 digitos'),
    check('email').isEmail().withMessage('Formato de e-mail inválido'),
], apiCtrl.changePassword)

router.post('/login/verifyToken', [
    check('userTk').isLength({ min: 5 }).withMessage('Favor informar token do usuário')
], apiCtrl.verifyToken)

router.post('/register', [
    check('password').isLength({ min: 5 }).withMessage('A senha deve conter 5 digitos'),
    check('email').isEmail().withMessage('Formato de e-mail inválido'),
    check('name').isLength({ min: 4 }).withMessage('Nome de usuário inválido')
], apiCtrl.createUser)

router.post('/login/admin', [
    check('password').isLength({ min: 5 }).withMessage('A senha deve conter 5 digitos'),
    check('email').isEmail().withMessage('Formato de e-mail inválido')   
], apiCtrl.loginUserAdmin)

router.get('/myData/:token', apiCtrl.myData)

module.exports = router