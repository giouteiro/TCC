const { response } = require('express');
var Pedidodb = require('../model/model');

//cria e salva um pedido novo
exports.create = (req, res) => {
    //validar solicitação
    if(!req.body){
        res.status(400).send({ message: "O campo não pode ficar vazio!"});
        return;
    }

    //novo pedido
    const pedido = new Pedidodb({
        nome: req.body.nome,
        nomeDoArtista: req.body.nomeDoArtista,
        tipo: req.body.tipo,
        usuario: req.user.id
    })



    //salva o pedido no banco de dados
    pedido
        .save(pedido)
        .then(data => {
           //res.send(data)
           res.redirect('/adc-pedido')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar a operação de adicionar"});
        });
}

// recuper e retorna todos os pedidos / recupera e retorna um único pedido
exports.find = (req, res) => {
    console.log(req.params.iduser)

    if(req.query.id){
        const id = req.query.id;

        Pedidodb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message: "Não foi possível encontrar um pedido com esse id "+ id})
            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Erro ao recuperar pedido com id "+ id})
        })
    }
    else {
        Pedidodb.find({
            usuario: req.params.iduser
        })
        .then(pedido => {
            res.send(pedido);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Um erro ocorreu durante a busca de informações do pedido"})
        })
    }

   
}

// atualiza um novo pedido inteficiado por id
exports.update = (req, res) => {
    if(!req.body){
        return res
            .status(400)
            .send({ message: "O campo não pode ficar vazio!"})
    }

    const id = req.params.id;
    Pedidodb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({ message: `Não foi possível pedido com $(id). Talvez o pedido não tenha sido encontrado!`})
        }else {
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({ message: "Erro ao atualizar as informações do pedido!"})
    })
}

// deleta um pedido com id especificado
exports.delete = (req, res) => {
    const id = req.params.id;

    Pedidodb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({ message: `Não foi possível excluir o pedido com $(id). Talvez o id esteja errado!`})
        }else {
            res.send({ message: "Pedido excluído com sucesso!"})
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Não foi possível excluir pedido com o id: "+ id
        });
    });
}