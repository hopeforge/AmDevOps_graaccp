const { validationResult } = require('express-validator/check');

const User = require('../models/user');

exports.loginUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    User.authenticate(email, password, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ data: null, error: "Erro interno ao realizar login" });
        }
        if (!user) return res.json({ data: null, error: "Usuário(a) ou senha incorreto(s)" });

        User.getToken(user._id, (err, userToken) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ data: null, error: "Erro interno ao gerar token do usuário" });
            }

            res.json({ data: { token: userToken, userName: user.name }, error: null });
        })

    })
}

exports.verifyToken = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { userTk } = req.body;

    User.decodeToken(userTk, (err, decode) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ auth: false, error: "Erro interno ao verificar token" });
        }
        if (!decode) return res.json({ auth: false, error: "Token inválido" });
        res.json({ auth: true, error: null });
    })
}

exports.createUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { email, password, name } = req.body;

    new User({
        email, password, name
    }).save()
        .then(() => {
            res.end("Usuário cadastrado com sucesso");
        })
        .catch((err) => {
            switch (err.code) {
                case 11000:
                    res.status(403).end("Usuário(a) já cadastrado(a)");
                    break;
                default:
                    console.error(err);
                    res.status(500).end("Erro Interno ao relizar o cadastro");
                    break;
            }
        })
}

exports.loginUserAdmin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    if (email == "admin@mail.com" && password == "Indra1234") {
        res.json({ auth: true })
    } else {
        res.json({ auth: false })
    }

}

exports.myData = (req, res) => {

    User.decodeToken(req.params.token, (err, decode) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ data: null, error: "Erro interno ao verificar token" });
        }
        if (!decode) return res.json({ data: null, error: "Token inválido" });
        delete decode.ActualUser._id
        delete decode.ActualUser.password
        res.json({ data: decode.ActualUser, error: null });
    })

}

exports.changePassword = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, passwordOld, password } = req.body;

    User.authenticate(email, passwordOld, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ data: null, error: "Erro interno ao confirmar login" });
        }
        if (!user) return res.json({ data: null, error: "Usuário(a) ou senha incorreto(s)" });

        User.changepwd(user._id, password, (err, userToken) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ data: null, error: "Erro interno ao alterar a senha do usuário" });
            }

            res.json({ data: true, error: null });
        })

    })

}