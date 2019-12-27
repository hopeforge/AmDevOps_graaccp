const { validationResult } = require('express-validator/check');

const Parceiras = require('../models/parceiras');

exports.getParceiras = async (req, res) => {
    let parceiras_list = await Parceiras.find({}).select("-__v").lean().exec();
    res.json(parceiras_list);
}

exports.cadastraParceiras = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { nome, endereco } = req.body;

    new Parceiras({
        nome, endereco
    }).save()
        .then(() => {
            res.end("Parceira(o) cadastrada");
        })
        .catch((err) => {
            switch (err.code) {
                case 11000:
                    res.status(403).end("Parceira(o) já cadastrado(a)");
                    break;
                default:
                    console.error(err);
                    res.status(500).end("Erro Interno ao relizar o cadastro");
                    break;
            }
        })
}

exports.removerParceiras = async (req, res) => {
    Parceiras.findByIdAndDelete(req.params.id).exec((err, done) => {
        if (err) {
            console.error(err);
            res.end("Erro interno ao remover Parceira");
        } else {
            if (!done) return res.end("Por favor tente novamente mais tarde.");
            res.end(`Parceira(o) ${done.nome} deletado(a)`);
        }
    })
}