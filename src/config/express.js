const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const exceptionHandler = require('express-exception-handler');
const error = require('../api/middlewares/error');
const tokenCheck = require('../api/middlewares/tokenCheck');
const { protectRoutes } = require('./config');

exceptionHandler.handle();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Configuração do middleware de sessão
app.use(
  resave: false,
  saveUninitialized: true,
//  cookie: { secure: process.env.NODE_ENV === 'production' }
);

app.use(flash());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../api/views'));
app.use(express.static(path.join(__dirname, '../public')));

global.WhatsAppInstances = {};

// Middleware existente
const routes = require('../api/routes/');
if (protectRoutes) {
  app.use(tokenCheck);
}
app.use('/', routes);

app.use(error.handler);

module.exports = app;
