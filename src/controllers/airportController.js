const { AirportService } = require('../services/index');
const { AirportRepository } = require('../repositories/index');
const { StatusCodes } = require('http-status-codes');

const airportService = new AirportService(new AirportRepository());

async function createAirport(req, res, next) {
    try {
        const airport = await airportService.createAirport({
            name: req.body.airportName,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Created a new airport entry",
            error: {},
            data: airport
        });

    } catch (error) {
        next(error);
    }
}

async function getAirports(req, res, next) {
    try {
        const airports = await airportService.getAirports();
        
        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "Retrieved data of all airports present",
            error: {},
            data: airports
        });
    } catch (error) {
        next(error);
    }
}

async function getAirport(req, res, next) {
    try {
        const airport = await airportService.getAirport(req.params.id);

        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "Retrieved data for the airport with given ID",
            error: {},
            data: airport
        });
    } catch (error) {
        next(error);
    }
}

async function deleteAirport(req, res, next) {
    try {
        const airport = await airportService.deleteAirport(req.params.id);

        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "Deleted the airport data for given ID",
            error: {},
            data: airport
        });
    } catch (error) {
        next(error);
    }
}

async function updateAirport(req, res, next) {
    try {
        const updatedAirport = await airportService.updateAirport(req.body.id, {
            name: req.body.airportName,
            code: req.body.code,
            address: req.body.address
        });

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Updated the airport data for given ID",
            error: {},
            data: updatedAirport
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createAirport,
    getAirport,
    getAirports,
    deleteAirport,
    updateAirport
}