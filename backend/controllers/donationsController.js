
const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const Donation = require('../models/donation');
const Level = require('../models/level');

exports.makeDonation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { valor } = req.body;

    User.decodeToken(req.params.token, (err, decode) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ data: false, error: "Erro interno ao verificar token" });
        }

        if (!decode) return res.json({ data: false, error: "Erro ao decodificar token" });

        let donationXp = valor * 0.7;

        new Donation({
            user: decode.ActualUser._id,
            valor: valor
        }).save()
            .then((data) => {

                Level.levelUp(decode.ActualUser._id, donationXp, (err, data) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ data: false, error: "Erro ao contabilizar level" });
                    }
                    if(!data) return res.status(500).json({ data: false, error: "Erro ao atualizar level" });

                    res.json({ data: true, error: null })
                })

            })
            .catch((err) => {
                console.log(err)
                res.json({ data: false, error: "Erro ao registrar doação" })
            })

    })

}

exports.myDonation = async (req, res) => {
    User.decodeToken(req.params.token, async (err, decode) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ data: false, error: "Erro interno ao verificar token" });
        }

        if (!decode) return res.json({ data: false, error: "Erro ao decodificar token" });

        let donations = await Donation.find({ user: decode.ActualUser._id }).lean();

        res.json({ data: donations, error: null });
    })
}