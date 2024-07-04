const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const { BadRequestError, InternalServerError, NotFoundError } = require("../errors");

class AirplaneService {
    constructor(airplaneRepository) {
        this.airplaneRepository = airplaneRepository; 
    }

    async createAirplane(data) {
        try {
            const airplane = await this.airplaneRepository.create(data);
            return airplane;
        } catch (error) {
            if(error.name === "SequelizeValidationError") {
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
                Logger.error(explanation);
                throw new BadRequestError("Airplane Data Field", explanation);
            }
            Logger.error("Some internal server error occured no new entry created.")
            throw new InternalServerError("Something went wrong, cannot create new airplane entry");
        }
    }

    async getAirplanes() {
        try {
            const airplanes = await this.airplaneRepository.getAll();
            return airplanes;
        } catch (error) {
            Logger.error("Cannot fetch the data of all airplanes, something went wrong internally");
            throw new InternalServerError("Something went wrong internally, no data fetched");
        }
    }

    async getAirplane(airplaneID) {
        try {
            // if(!Number.isInteger(airplaneID)) {
            //     Logger.error(`Invalid airplaneID: ${airplaneID}`);
            //     throw new BadRequestError("airplaneID", "Airplane ID must be an integer");
            // }

            const airplane = await this.airplaneRepository.get(airplaneID);
            return airplane;
        } catch (error) {
            Logger.error(`Cannot fetch the data of airplane for ID ${airplaneID}`);
            if(error.statusCode === StatusCodes.NOT_FOUND) {
                throw new NotFoundError(airplaneID, `Airplane for ID ${airplaneID} not found!`)
            }
            throw new InternalServerError("Something went wrong internally, no data fetched");
        }
    }

    async deleteAirplane(airplaneID) {
        try {
            const airplane = await this.airplaneRepository.delete(airplaneID);
            return airplane;
        } catch (error) {
            Logger.error(`Cannot delete the data of airplane for ID ${airplaneID}`);
            if(error.statusCode === StatusCodes.NOT_FOUND) {
                throw new NotFoundError(airplaneID, `Airplane for ID ${airplaneID} not found to be deleted!`)
            }
            throw new InternalServerError("Something went wrong internally, no data deleted!");
        }
    }

    async updateAirplane(airplaneID, capacity) {
        try {
            const updatedAirplane = await this.airplaneRepository.update(airplaneID, capacity);
            return updatedAirplane;
        } catch (error) {
            Logger.error(`Cannot update the data of airplane for ID ${airplaneID}`);
            if(error.statusCode === StatusCodes.NOT_FOUND) {
                throw new NotFoundError(airplaneID, `Airplane for ID ${airplaneID} not found to update!`)
            }
            throw new InternalServerError("Something went wrong internally, no data updated!");
        }
    }
}

module.exports = AirplaneService;