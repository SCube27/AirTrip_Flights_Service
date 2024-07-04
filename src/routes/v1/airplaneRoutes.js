const express = require('express');

const { airplaneMiddlewares } = require('../../middlewares/index');
const { AirplaneController } = require('../../controllers/index')

const airplaneRouter = express.Router();

// api/v1/airplanes POST createAirplane (requires: controller, validationMiddleware)
airplaneRouter.post("/", airplaneMiddlewares.validateCreateRequest, AirplaneController.createAirplane);

// api/v1/airplanes GET getAirplanes (requires: controller)
airplaneRouter.get("/", AirplaneController.getAirplanes);

// api/v1/airplanes/:id GET getAirplane (requires: controller)
airplaneRouter.get('/:id', AirplaneController.getAirplane);

// api/v1/airplanes/:id DELETE deleteAirplane (requires: controller)
airplaneRouter.delete('/:id', AirplaneController.deleteAirplane);

// api/v1/airplanes PATCH updateAirplane (requires: controller)
airplaneRouter.patch("/", AirplaneController.updateAirplane);

module.exports = airplaneRouter;