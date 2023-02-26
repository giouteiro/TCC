var Pedidoadmdb = require('../model/pedidoadm');

exports.createpedidoadm = (req, res) => {
    const pedidoadm = new Pedidoadmdb({
        nome: req.body.nome,
        nomeOriginal: req.body.nomeOriginal,
        nomeDoArtista: req.body.nomeDoArtista,
        tipo: req.body.tipo,
        texto: req.body.texto,
        imagemObra: req.file.filename
    })

    console.log(pedidoadm)
    pedidoadm
        .save(pedidoadm)
        .then(data => {
            //res.send(data)
            res.redirect('/admin/acervo')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar a operação de adicionar"
            });
        });
}

exports.listar = async (req, res) => {
    const pedidoadm = await Pedidoadmdb.findById(req.params.id)
    res.render('derkuss', {
        pedidoadm: pedidoadm
    })
}