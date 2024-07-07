const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const { BadRequestError, InternalServerError, NotFoundError } = require("../errors");

class AirportService {
    constructor(airportRepository) {
        this.airportRepository = airportRepository; 
    }

    async createAirport(data) {
        try {
            const airport = await this.airportRepository.create(data);
            return airport;
        } catch (error) {
            if(error.name === "SequelizeValidationError") {
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
                Logger.error(explanation);
                throw new BadRequestError("Airport Data Field", explanation);
            }
            Logger.error("Some internal server error occured no new entry created.")
            throw new InternalServerError("Something went wrong, cannot create new airport entry");
        }
    }

    async getAirports() {
        try {
            const airports = await this.airportRepository.getAll();
            return airports;
        } catch (error) {
            Logger.error("Cannot fetch the data of all airports, something went wrong internally");
            throw new InternalServerError("Something went wrong internally, no data fetched");
        }
    }

    async getAirport(airportID) {
        try {
            // if(!Number.isInteger(airplaneID)) {
            //     Logger.error(`Invalid airplaneID: ${airplaneID}`);
            //     throw new BadRequestError("airplaneID", "Airplane ID must be an integer");
            // }

            const airport = await this.airportRepository.get(airportID);
            return airport;
        } catch (error) {
            Logger.error(`Cannot fetch the data of airport for ID ${airportID}`);
            if(error.statusCode === StatusCodes.NOT_FOUND) {
                throw new NotFoundError(airportID, `Airport for ID ${airportID} not found!`)
            }
            throw new InternalServerError("Something went wrong internally, no data fetched");
        }
    }

    async deleteAirport(airportID) {
        try {
            const airport = await this.airportRepository.delete(airportID);
            return airport;
        } catch (error) {
            Logger.error(`Cannot delete the data of airport for ID ${airplaneID}`);
            if(error.statusCode === StatusCodes.NOT_FOUND) {
                throw new NotFoundError(airplaneID, `Airport for ID ${airplaneID} not found to be deleted!`)
            }
            throw new InternalServerError("Something went wrong internally, no data deleted!");
        }
    }

    async updateAirport(airportID, capacity) {
        try {
            const updatedAirport = await this.airportRepository.update(airportID, capacity);
            return updatedAirport;
        } catch (error) {
            Logger.error(`Cannot update the data of airplane for ID ${airportID}`);
            if(error.statusCode === StatusCodes.NOT_FOUND) {
                throw new NotFoundError(airportID, `Airport for ID ${airportID} not found to update!`)
            }
            throw new InternalServerError("Something went wrong internally, no data updated!");
        }
    }
}

module.exports = AirportService;