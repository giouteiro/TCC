const { response } = require('express');
var Admdb = require('../model/adm');

exports.createadm = (req, res) => {
    const adm = new Admdb({
        nome: req.body.nome,
        nomeOriginal: req.body.nomeOriginal,
        nomeDoArtista: req.body.nomeDoArtista,
        tipo: req.body.tipo,
        texto: req.body.texto,
        imagemObra: req.body.imagemObra
    })

    adm
    .save(adm)
    .then(data => {
       //res.send(data)
       res.redirect('/admin/acervo')
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Um erro ocorreu ao criar a operação de adicionar"});
    });
}
