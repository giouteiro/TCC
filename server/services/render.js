const axios = require('axios');
var Admdb = require('../model/adm');


exports.homeRoutes = (req, res) => {
    console.log(req.user.id)
    axios.get('http://localhost:3000/api/pedidos/'+req.user.id)
    .then(function(response){
        console.log(response.data)
        res.render('index', {pedidos: response.data});
    })
    .catch(err => {
        res.send(err);
    })
  
}

exports.adc_pedido = (req, res) => {
    res.render('adc_pedido');
}

exports.update_pedido = (req, res) => {
    axios.get('http://localhost:3000/api/pedidos', { params: { id: req.query.id}})
    .then(function(pedidodata){
        res.render("update_pedido", { pedido: pedidodata.data})
    })
    .catch(err => {
        res.send(err);
    })
}

exports.abreregistro = (req, res) => {
    res.render('registro')
}

exports.abrelogin = (req, res) => {
    res.render('login')
}

exports.abrehome = (req, res) => {
    res.render('home')
}

exports.abreacervo = async (req, res) => {

    const acervos = await Admdb.find({})
    res.render('acervo', {Acervos:acervos, Usuario:req.user})
}

exports.abrederkuss = (req, res) => {
    res.render('derkuss')
}

exports.abreadmin = (req, res) => {
    res.render('admin')
}

exports.abreacervoadmin = (req, res) => {
    res.render('acervoadmin')
}