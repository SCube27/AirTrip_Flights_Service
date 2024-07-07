const { StatusCodes } = require("http-status-codes");

const { Logger } = require("../config");
const { BadRequestError, InternalServerError, NotFoundError } = require("../errors/index")

class CityService {
    constructor(cityRepository) {
        this.cityRepository = cityRepository;
    }

    async createCity(data) {
        try {
            const city = await this.cityRepository.create(data);
            return city;
        } catch (error) {
            if(error.name === "SequelizeValidationError" || error.name === 'SequelizeUniqueConstraintError') {
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
                Logger.error(explanation);
                throw new BadRequestError("City Data Field", explanation);
            }
            Logger.error("Some internal server error occured, no new entry created.")
            throw new InternalServerError("Something went wrong, cannot create new city entry");
        }
    }
    
    async deleteCity(cityID) {
        try {
            const deleteCity = await this.cityRepository.delete(cityID);
            return deleteCity;
        } catch (error) {
            if(error.statusCode === StatusCodes.NOT_FOUND) {
                Logger.error(`Cannot delete the data for City ID ${cityID} as not found in the DB`);
                throw new NotFoundError(cityID, 'City for the given ID not found');
            }
            Logger.error('Cannot delete the data as something went wrong internally');
            throw new InternalServerError('Cannot delete the data, something went wrong!');
        }
    }

    async updateCity(cityID, newName) {
        try {
            const updatedCity = await this.cityRepository.update(cityID, newName);
            return updatedCity;
        } catch (error) {
            if(error.statusCode === StatusCodes.NOT_FOUND) {
                Logger.error(`Cannot update the data for City ID ${cityID} as not found in the DB`);
                throw new NotFoundError(cityID, 'City for the given ID not found');
            }
            Logger.error('Cannot update the data as something went wrong internally');
            throw new InternalServerError('Cannot update the data, something went wrong!');
        }
    }

    async getCities() {
        try {
            const cities = await this.cityRepository.getAll();
            return cities;
        } catch (error) {
            Logger.error("Cannot fetch the data of all cities, something went wrong internally");
            throw new InternalServerError("Something went wrong internally, no data fetched");
        }
    }
} 

module.exports = CityService;