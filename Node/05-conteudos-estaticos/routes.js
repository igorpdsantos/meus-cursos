const express = require('express');
const route = express.Router();

const HomeController = require('./src/controllers/homeController');

route.get('/', HomeController.paginaInicial);
route.post('/', HomeController.trataPost);

module.exports = route;