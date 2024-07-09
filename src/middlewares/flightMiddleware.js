const { StatusCodes } = require('http-status-codes');

const { Logger } = require('../config');
const { BadRequestError } = require('../errors/index');

function validateCreateRequest(req, res, next) {
    if(!req.body.flightNumber) {
        Logger.error("Bad request for creating flight recieved.(No flightNumber provided)");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Flight entry not created",
            error: new BadRequestError("flightNumber", "flightNumber not provided"),
            data: {}
        });
    }

    if(!req.body.airplaneId) {
        Logger.error("Bad request for creating flight recieved.(No airplaneId provided)");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Flight entry not created",
            error: new BadRequestError("airplaneId", "airplaneId not provided"),
            data: {}
        });
    }

    if(!req.body.departureAirportId) {
        Logger.error("Bad request for creating flight recieved.(No departureAirportId provided)");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Flight entry not created",
            error: new BadRequestError("departureAirportId", "departureAirportId not provided"),
            data: {}
        });
    }

    if(!req.body.arrivalAirportId) {
        Logger.error("Bad request for creating flight recieved.(No arrivalAirportId provided)");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Flight entry not created",
            error: new BadRequestError("arrivalAirportId", "arrivalAirportId not provided"),
            data: {}
        });
    }

    if(!req.body.departureTime) {
        Logger.error("Bad request for creating flight recieved.(No departureTime provided)");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Flight entry not created",
            error: new BadRequestError("departureTime", "departureTime not provided"),
            data: {}
        });
    }

    if(!req.body.arrivalTime) {
        Logger.error("Bad request for creating flight recieved.(No arrivalTime provided)");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Flight entry not created",
            error: new BadRequestError("arrivalTime", "arrivalTime not provided"),
            data: {}
        });
    }

    if(!req.body.price) {
        Logger.error("Bad request for creating flight recieved.(Flight Price not provided)");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Flight entry not created",
            error: new BadRequestError("price", "price of the flight not provided"),
            data: {}
        });
    }

    if(!req.body.totalSeats) {
        Logger.error("Bad request for creating flight recieved.(totalSeats available not provided)");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Flight entry not created",
            error: new BadRequestError("totalSeats", "totalSeats of the flight not provided"),
            data: {}
        });
    }

    next();
} 

function updateSeatsRequest(req, res, next) {
    if(!req.body.seats) {
        Logger.error("Bad request for creating flight recieved.(Seats number to be updated not provided)");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Seats not updated",
            error: new BadRequestError("seats", "Seats to be updated for the flight not provided"),
            data: {}
        });
    }

    next();
}

module.exports = {
    validateCreateRequest,
    updateSeatsRequest
}