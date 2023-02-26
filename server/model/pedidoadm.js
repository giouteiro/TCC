const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    nome: {
        type: 'String',
        required: true
    },
    nomeOriginal: {
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
    texto: {
        type: 'String',
        required: true
    },
    imagemObra: {
        type: 'String',
        required: true
    }
})

const Pedidoadmdb = mongoose.model('pedidoadmdb', schema);

module.exports = Pedidoadmdb;