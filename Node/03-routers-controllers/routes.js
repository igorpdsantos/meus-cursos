const express = require('express');
const route = express.Router();

const HomeController = require('./controllers/homeController.js');

route.get('/', HomeController.paginaInicial);
route.post('/', HomeController.trataPost);

module.exports = route;