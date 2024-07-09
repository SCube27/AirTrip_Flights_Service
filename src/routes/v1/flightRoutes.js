const express = require('express');

const { FlightController } = require('../../controllers/index');
const { FlightMiddlewares } = require('../../middlewares/index');

const flightRouter = express.Router();

flightRouter.post('/', FlightMiddlewares.validateCreateRequest, FlightController.createFlight);

flightRouter.get('/', FlightController.getAllFlights);

flightRouter.get('/:id', FlightController.getFlightDetails);

module.exports = flightRouter;