const { StatusCodes } = require('http-status-codes');

const { CityService } = require('../services/index');
const { CityRepository } = require('../repositories/index');

const cityService = new CityService(new CityRepository());

async function createCity(req, res, next) {
    try {
        const city = await cityService.createCity({
            name: req.body.cityName
        });

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Created a new city entry",
            error: {},
            data: city
        });
    } catch (error) {
        next(error);
    }
}

async function deleteCity(req, res, next) {
    try {
        const city = await cityService.deleteCity(req.params.id);
        let cityStatus = false;
        if(city == 1) {
            cityStatus = true;
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Deleted the city for given ID",
            error: {},
            data: {
                "Deleted": req.params.id,
                "Status": cityStatus
            }
        });
    } catch (error) {
        next(error);
    }
}

async function updateCity(req, res, next) {
    try {
        const updatedCity = await cityService.updateCity(req.params.id, {
            name: req.body.cityName
        });

        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: 'Updated the city for the given ID',
            error: {},
            data: {
                "updated ID": req.params.id,
                "data": req.body.cityName,
                "status": updatedCity
            }
        });
    } catch (error) {
        next(error);
    }
}

async function getCities(req, res, next) {
    try {
        const cities = await cityService.getCities();

        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "Fetched all city details",
            error: {},
            date: cities
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createCity,
    deleteCity,
    updateCity,
    getCities,
}