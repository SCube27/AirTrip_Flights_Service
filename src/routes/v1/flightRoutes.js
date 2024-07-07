const express = require('express');

const { FlightController } = require('../../controllers/index');
const { FlightMiddlewares } = require('../../middlewares/index');

const flightRouter = express.Router();

flightRouter.post('/', FlightMiddlewares.validateCreateRequest, FlightController.createFlight);

flightRouter.get('/', FlightController.getAllFlights);

module.exports = flightRouter;