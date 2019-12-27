
const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const sender = require("../libs/mailSender");

exports.sendMail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { titulo, textBody, htmlBody } = req.body

    let userList = (await User.find({}).lean().exec()).map((el) => el.email);

    sender.sendMail(userList, titulo, textBody, htmlBody)
        .then((data) => {
            res.json({ data: `E-mail enviado para ${userList.length} usuário(s)`, error: "Erro ao enviar e-mail" })
        })
        .catch((err) => {
            console.log(err);
            res.json({ data: false, error: "Erro ao enviar e-mail" })
        })
}