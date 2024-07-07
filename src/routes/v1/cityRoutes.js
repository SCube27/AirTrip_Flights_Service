const express = require('express');

const { CityController } = require('../../controllers/index');
const { CityMiddlewares } = require('../../middlewares/index');

const cityRouter = express.Router();

cityRouter.post('/', CityMiddlewares.validateCreateRequest, CityController.createCity);

cityRouter.delete('/:id', CityController.deleteCity);

cityRouter.patch('/:id', CityController.updateCity);

cityRouter.get('/', CityController.getCities);

module.exports = cityRouter;