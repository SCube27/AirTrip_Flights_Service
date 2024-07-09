const { StatusCodes } = require("http-status-codes");
const { Op } = require('sequelize');

const { Logger } = require("../config");
const { BadRequestError, InternalServerError } = require("../errors");
const { compareTime } = require('../utils/index');

class FlightService {
    constructor(flightRepository) {
        this.flightRepository = flightRepository;
    }

    async createFlight(data) {
        try {
            const { departureTime, arrivalTime } = data;

            if(!compareTime(arrivalTime, departureTime)) {
                throw new BadRequestError;
            }

            const flight = await this.flightRepository.create(data);
            return flight;
        } catch (error) {
            if(error.name === "SequelizeValidationError") {
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
                Logger.error(explanation);
                throw new BadRequestError("Flight Data Field", explanation);
            }
            if(error.name === "BadRequest") {
                Logger.error('Arrival time is not greater than Departure time.');
                throw new BadRequestError("Departure & Arrival Time", "Arrival time should be greater than departure time");
            }
            Logger.error("Some internal server error occured no new entry created.")
            throw new InternalServerError("Something went wrong, cannot create new flight entry");
        }
    }

    async getAllFlights(query) {
        let customFilter = {};
        let sortFilter = [];

        const endTripTime = " 23:59:00";

        // searching based on the source and destination
        if (query.trips) {
            const [departureAirportId, arrivalAirportId] = query.trips.split("-");
            customFilter.departureAirportId = departureAirportId;
            customFilter.arrivalAirportId = arrivalAirportId;

            if (departureAirportId === arrivalAirportId) {
                return {};
            }
        }

        // searching based on range of price of the flights
        if(query.price) {
            const [minPrice, maxPrice] = query.price.split("-");
            customFilter.price = {
                [Op.between] : [minPrice, ((maxPrice == undefined) ? 20000 : maxPrice)]
            }
        }

        // searching based on number of travellers and available seats in the present flights
        if(query.travellers) {
            customFilter.totalSeats = {
                [Op.gte]: query.travellers
            }
        }

        // searching flights based on date
        if(query.tripDate) {
            customFilter.departureTime = {
                [Op.between]: [query.tripDate, query.tripDate + endTripTime]
            }
        }

        if(query.sort) {
            const params = query.sort.split(',');
            const sortFilters = params.map((param) => param.split("_"));
            sortFilter = sortFilters;
        }

        try {
            const flights = await this.flightRepository.getAllFlights(customFilter, sortFilter);
            return flights;
        } catch (error) {
            Logger.error("An internal server error occurred, no new entry created.");
            throw new InternalServerError("Something went wrong, cannot create new flight entry");
        }
    }

    async getFlightDetails(id) {
        try {
            const flight = await this.flightRepository.get(id);
            return flight;
        } catch (error) {
            Logger.error(`Cannot fetch the data of flight for ID ${id}`);
            if(error.statusCode === StatusCodes.NOT_FOUND) {
                throw new NotFoundError(id, `Flight for ID ${id} not found!`)
            }
            throw new InternalServerError("Something went wrong internally, no data fetched");
        }
    }
}

module.exports = FlightService;