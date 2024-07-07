const express = require('express');

const { AirportController } = require('../../controllers/index');
const { AirportMiddlewares } = require('../../middlewares/index');

const airportRouter = express.Router();

airportRouter.post("/", AirportMiddlewares.validateCreateRequest, AirportController.createAirport);

airportRouter.get("/", AirportController.getAirports);

airportRouter.get('/:id', AirportController.getAirport);

airportRouter.delete('/:id', AirportController.deleteAirport);

airportRouter.patch("/", AirportController.updateAirport);

module.exports = airportRouter;