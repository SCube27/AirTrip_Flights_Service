const express = require('express');
const airplaneRouter = require('./airplaneRoutes');
const cityRouter = require('./cityRoutes');

const v1Router = express.Router();

v1Router.use('/airplanes', airplaneRouter);

v1Router.use('/cities', cityRouter);

module.exports = v1Router;