const express = require('express');
const levelCtrl = require('../controllers/levelsController');
const router = express.Router();

const { check } = require('express-validator/check');

router.get('/check/:token', levelCtrl.userLevel)

module.exports = router