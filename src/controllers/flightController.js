const { StatusCodes } = require('http-status-codes');

const { FlightService } = require('../services/index');
const { FlightRepository } = require('../repositories/index');

const flightService = new FlightService(new FlightRepository());

async function createFlight(req, res, next) {
    try {
        const flight = await flightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            departureTime: req.body.departureTime,
            arrivalTime: req.body.arrivalTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats 
        });

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Created a new flight entry",
            error: {},
            data: flight
        });
    } catch (error) {
        next(error);
    }
}

async function getAllFlights(req, res, next) {
    try {
        const flights = await flightService.getAllFlights(req.query);

        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "Fetched flights based on filters",
            error: {},
            data: flights
        });
    } catch (error) {
        next(error); 
    }
}

async function getFlightDetails(req, res, next) {
    try {
        const flight = await flightService.getFlightDetails(req.params.id);

        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            mesasge: "Fetched the flight details",
            error: {},
            data: flight
        });
    } catch (error) {
        next(error);
    }
}

async function updateSeats(req, res, next) {
    try {
        const updatedSeats = await flightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            dec: req.body.dec
        });

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Updated the seats data according to the request made!",
            error: {},
            data: updatedSeats
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlightDetails,
    updateSeats
}