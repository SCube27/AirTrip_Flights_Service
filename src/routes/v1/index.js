const express = require('express');

const airplaneRouter = require('./airplaneRoutes');
const cityRouter = require('./cityRoutes');
const airportRouter = require('./airportRoutes');
const flightRouter = require('./flightRoutes');

const v1Router = express.Router();

v1Router.use('/airplanes', airplaneRouter);

v1Router.use('/cities', cityRouter);

v1Router.use('/airports', airportRouter);

v1Router.use('/flights', flightRouter);

module.exports = v1Router;