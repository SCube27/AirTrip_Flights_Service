const CrudRepository = require('./crudRepository');
const { Flight } = require('../models/index');
const { Logger } = require('../config');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        try {
            const flights = await Flight.findAll({
                where: filter,
                order: sort
            });
    
            return flights;
        } catch (error) {
            Logger.error('Error occured inside repository while fetching the flights!')
            throw error;
        }
    }
}

module.exports = FlightRepository;