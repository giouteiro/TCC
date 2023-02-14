const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
const admcontroller = require('../controller/admcontroller');
const logincontroller = require('../controller/logincontroller');

const bloqueio = require('../config/bloqueio')
const passport = require('../config/passport')

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

route.get('/update-pedido', services.update_pedido);

//API
route.post('/api/pedidos', controller.create);
route.get('/api/pedidos/:iduser', controller.find);
route.put('/api/pedidos/:iduser', controller.update);
route.delete('/api/pedidos/:id', controller.delete);

route.post('/adm', admcontroller.createadm)

route.post('/auth/register', logincontroller.registro)
route.get('/auth/register', services.abreregistro)

route.post('/auth/login', passport.authenticate('local', {
    successRedirect: '/pedidos',
    failureRedirect: '/auth/register',
}))
route.get('/auth/login', services.abrelogin)

route.post('/')
route.get('/', services.abrehome)

route.post('/acervo')
route.get('/acervo', services.abreacervo)

route.post('/derkuss')
route.get('/derkuss', services.abrederkuss)

route.get('/admin', services.abreadmin)
route.get('/admin/acervo', services.abreacervoadmin)
route.post('/admin/acervo', admcontroller.createadm)

module.exports = route