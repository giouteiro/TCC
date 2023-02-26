var passport = require('passport');
var LocalStrategy = require('passport-local');
const User = require('../model/User')
const bcrypt = require('bcrypt')

passport.use(new LocalStrategy(async function verify(username, password, cb) {

    console.log(username)
    const usuario = await User.findOne({
        email: username
    })

    console.log(usuario)

    if (!usuario) {
        console.log('usuario')
        return cb(null, false, {
            message: 'Usuário não encontrado!'
        });
    } else {
        if (!await bcrypt.compare(password, usuario.senha)) {
            console.log(usuario.senha)
            return cb(null, false, {
                message: 'Senha incorreta!'
            });
        } else {
            console.log('ok')
            return cb(null, usuario);
        }
    }
}));

passport.serializeUser(function (usuario, cb) {
    process.nextTick(function () {
        cb(null, {
            id: usuario._id,
            email: usuario.email,
            admin: usuario.admin,
        });
    });
});

passport.deserializeUser(function (usuario, cb) {
    process.nextTick(function () {
        return cb(null, usuario);
    });
});

module.exports = passport