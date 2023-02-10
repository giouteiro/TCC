const { response } = require('express');
var Admdb = require('../model/adm');

exports.createadm = (req, res) => {
    const adm = new Admdb({
        nome,
        nomeOriginal,
        imagemObra,
        texto,
        nomeDoArtista,
        tipo
    })
}
