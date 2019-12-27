const { validationResult } = require('express-validator/check');

const Cupons = require('../models/cupons');
const CuponsUsados = require('../models/cuponsGastos');
const User = require('../models/user');
const Level = require('../models/level');

exports.getCupons = async (req, res) => {
    let cupons_list = await Cupons.find({}).select("-__v").populate("parceiras").lean().exec();
    res.json(cupons_list);
}

exports.downCupon = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const { id, userLink } = req.body;

        let cuponFind = await Cupons.findOne({ id: id }).select("-__v").populate("parceiras").lean().exec();
        let user = await User.findOne({ link: { $all: [userLink] } }).exec();

        user.link.splice(user.link.indexOf(userLink), 1);
        let newUser = await user.save();

        new CuponsUsados({
            user: newUser._id,
            cupon: cuponFind._id,
            data_fim: cuponFind.data_fim,
            id: cuponFind.id,
            disponible: false
        }).save()
            .then(() => {
                res.json({ data: true, error: null });
            })
            .catch((err) => {
                console.log(err);
                res.json({ data: false, error: "Erro ao dar baixa no cupom" })
            })
    } catch (error) {
        console.log(error)
        res.json({ data: false, error: "Error interno ao processar essa solicitação" });
    }

}

exports.activeCupons = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { cuponId } = req.body;

    User.decodeToken(req.params.token, async (err, decode) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ data: false, error: "Erro interno ao verificar token" });
        }
        if (!decode) return res.json({ data: false, error: "Token inválido" });

        try {

            let UserModel = await User.findOne({ _id: decode.ActualUser._id }).exec();

            let idForUser = Math.random().toString(36).substring(7).toLocaleUpperCase();

            let cupons_list = await Cupons.findOne({ id: cuponId }).lean().exec();

            if (!cupons_list) return res.json({ data: false, error: "Cupon não encontrado" });

            let excludes_ja_ativados = await CuponsUsados.findOne({ cupon: cupons_list._id, user: UserModel._id, disponible: false }).lean().exec();

            if (excludes_ja_ativados) return res.json({ data: false, error: "Cupom já usado" });

            UserModel.link.push(idForUser);

            await UserModel.save();

            res.json({ data: { cuponId: cuponId, userID: idForUser }, error: null });
        } catch (error) {
            console.log(error)
            res.json({ data: false, error: "Error interno ao processar essa solicitação" });
        }

    })
}

exports.getUserCupons = async (req, res) => {

    User.decodeToken(req.params.token, async (err, decode) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ data: false, error: "Erro interno ao verificar token" });
        }
        if (!decode) return res.json({ data: false, error: "Token inválido" });

        try {

            let excludes_ja_ativados = (await CuponsUsados.find({ user: decode.ActualUser._id, disponible: false }, ['id']).lean().exec()).map((el) => el.id);
            let cupons_list = await Cupons.find({ id: { $nin: [...excludes_ja_ativados] } }).select("-__v").populate("parceiras").lean().exec();

            if (!cupons_list.length > 0) return res.json({ data: null, error: null });

            Level.getLevel(decode.ActualUser._id, (error, userLevelResult) => {
                if (error) res.json({ data: null, error: "Erro ao localizar level do usuário" });
                if (userLevelResult.level == 0) return res.json({ data: null, error: null });

                let userCupons = cupons_list.map((cupon) => {
                    let desconto = userLevelResult.level * 3;
                    delete cupon.parceiras._id
                    cupon.desconto = desconto > 25 ? 25 : desconto;
                    return cupon;
                });

                res.json({ data: userCupons, error: null });
            })

        } catch (error) {
            console.log(error)
            res.json({ data: false, error: "Error interno ao processar essa solicitação" });
        }
    })
}

exports.cadastraCupons = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { nome, parceiras, data_fim } = req.body;

    new Cupons({
        nome, parceiras, data_fim
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

exports.removerCupons = async (req, res) => {
    Cupons.findByIdAndDelete(req.params.id).exec((err, done) => {
        if (err) {
            console.error(err);
            res.end("Erro interno ao remover Parceira");
        } else {
            if (!done) return res.end("Por favor tente novamente mais tarde.");
            res.end(`Parceira(o) ${done.nome} deletado(a)`);
        }
    })
}

exports.updateCupons = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).end("Favor preencher campos obrigatórios");
    }

    const { nome, parceiras, data_fim, id } = req.body;

    Cupons.findByIdAndUpdate(id, { $set: { nome, parceiras, data_fim } }).exec((err, done) => {
        if (err) {
            console.error(err)
            res.status(500).end("Erro interno ao atualizar o cupon")
        } else {
            if (!done) return res.status(500).end("Por favor tente novamente mais tarde.")
            res.end(`Cupon atualizado`)
        }
    })

}