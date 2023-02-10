const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    nome: {
        type: 'String',
        required: true
    },
    nomeDoArtista: {
        type: 'String',
        required: true
    },
    tipo: {
        type: 'String',
        required: true
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdb'
    }
})

const Pedidodb = mongoose.model('pedidodb', schema);

module.exports = Pedidodb;