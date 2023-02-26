const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    email: {
        type: 'String',
        required: true
    },
    senha: {
        type: 'String',
        required: true
    }
})

const Administrador = mongoose.model('administradordb', schema);

module.exports = Administrador;


