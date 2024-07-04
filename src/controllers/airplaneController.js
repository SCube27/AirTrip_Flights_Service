const { AirplaneService } = require('../services/index');
const { AirplaneRepository } = require('../repositories/index');
const { StatusCodes } = require('http-status-codes');

const airplaneService = new AirplaneService(new AirplaneRepository());

async function createAirplane(req, res, next) {
    try {
        const airplane = await airplaneService.createAirplane({
            airplaneName: req.body.airplaneName,
            capacity: req.body.capacity
        });

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Created a new airplane entry",
            error: {},
            data: airplane
        });

    } catch (error) {
        next(error);
    }
}

async function getAirplanes(req, res, next) {
    try {
        const airplanes = await airplaneService.getAirplanes();
        
        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "Retrieved data of all airplanes present",
            error: {},
            data: airplanes
        });
    } catch (error) {
        next(error);
    }
}

async function getAirplane(req, res, next) {
    try {
        const airplane = await airplaneService.getAirplane(req.params.id);

        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "Retrieved data for the airplane with given ID",
            error: {},
            data: airplane
        });
    } catch (error) {
        next(error);
    }
}

async function deleteAirplane(req, res, next) {
    try {
        const airplane = await airplaneService.deleteAirplane(req.params.id);

        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "Deleted the airplane data for given ID",
            error: {},
            data: airplane
        });
    } catch (error) {
        next(error);
    }
}

async function updateAirplane(req, res, next) {
    try {
        const updatedAirplane = await airplaneService.updateAirplane(req.body.id, {
            capacity: req.body.capacity
        });

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Updated the airplane data for given ID",
            error: {},
            data: updatedAirplane
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
}