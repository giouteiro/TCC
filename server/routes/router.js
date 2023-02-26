const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
const pedidoadmcontroller = require('../controller/pedidoadmcontroller');
const administradorcontroller = require('../controller/administradorcontroller');
const logincontroller = require('../controller/logincontroller');

const bloqueio = require('../config/bloqueio')
const bloqueio2 = require('../config/bloqueio2')
const passport = require('../config/passport')

const upload = require('../config/multer')
/**
 * @description Root Rout
 * @method GET /
 */

route.get('/pedidos', bloqueio, services.homeRoutes);

/**
 * @description adiciona pedidos
 * @method GET /adc-pedido
 */

route.get('/adc-pedido', services.adc_pedido);

/**
 * @description atualiza pedidos
 * @method GET /update-pedido
 */

route.get('/update-pedido/:iduser', services.update_pedido);
route.post('/update-pedido/:iduser', services.update_pedido);

//API
route.post('/api/pedidos', controller.create);
route.get('/api/pedidos/:iduser', controller.find);
route.post('/api/pedidos/:iduser', controller.update);
route.delete('/api/pedidos/:id', controller.delete);

route.post('/pedidoadm', pedidoadmcontroller.createpedidoadm)

route.post('/auth/register', logincontroller.registro)
route.get('/auth/register', services.abreregistro)

route.post('/auth/login', passport.authenticate('local', {
    successRedirect: '/pedidos',
    failureRedirect: '/auth/register',
}))
route.get('/auth/login', services.abrelogin)

route.get('/', services.abrehome)

route.get('/acervo', services.abreacervo)

route.get('/acervo/:id', pedidoadmcontroller.listar)

route.get('/adminlogin', services.abreloginadmin)
route.post('/adminlogin', passport.authenticate('local', {
    successRedirect: '/admin/acervo',
    failureRedirect: '/adminlogin',
}))
route.get('/admin/acervo', bloqueio2,services.abreacervoadmin)
route.post('/admin/acervo', bloqueio2, upload.single('imagemObra'),  pedidoadmcontroller.createpedidoadm)

module.exports = route