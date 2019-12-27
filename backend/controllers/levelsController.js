const { validationResult } = require('express-validator/check');

const Level = require('../models/level');
const User = require('../models/user');

exports.userLevel = (req, res) => {
    User.decodeToken(req.params.token, (err, userDecode) => {
        if (err) return res.json({ data: null, error: "Erro de autenticação" });
        if(!userDecode) return res.json({ data: null, error: "Erro ao decodificar token do usário" });
        Level.getLevel(userDecode.ActualUser._id, (error, userLevelResult) => {
            if (error) res.json({ data: null, error: "Erro ao localizar level do usuário" });
            delete userLevelResult.user;
            delete userLevelResult._id;
            res.json({ data: userLevelResult, error: null });
        })
    })
}