const express = require('express');
const filesCtrl = require('../controllers/filesController');
const router = express.Router();

const { check } = require('express-validator/check');

router.get('/get', filesCtrl.getFile);

module.exports = router