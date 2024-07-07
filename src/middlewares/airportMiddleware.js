const { StatusCodes } = require('http-status-codes');
const { Logger } = require('../config');
const { BadRequestError } = require('../errors/index');

function validateCreateRequest(req, res, next) {
    if(!req.body.airportName) {
        Logger.error("Bad request for creating airport recieved.(No airport name provided)");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Airport entry not created",
            error: new BadRequestError("airportName", "Name of airport not provided"),
            data: {}
        });
    }

    if(!req.body.code) {
        Logger.error("Bad request for creating airport recieved.(No airport code provided)");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Airport entry not created",
            error: new BadRequestError("code", "Airport code not provided"),
            data: {}
        });
    }

    if(!req.body.cityId) {
        Logger.error("Bad request for creating airport recieved.(No cityId provided)");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Airport entry not created",
            error: new BadRequestError("cityId", "CityID of airport not provided"),
            data: {}
        });
    }

    next();
} 

module.exports = {
    validateCreateRequest,
}