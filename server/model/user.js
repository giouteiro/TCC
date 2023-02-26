const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    nome: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    senha: {
        type: 'String',
        required: true
    }, 
    pedidos:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'pedidodb'
    },
    admin:{
        type: 'Boolean',
        default:false
    }
})

const User = mongoose.model('userdb', schema);

module.exports = User;


