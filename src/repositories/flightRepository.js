const { Sequelize } = require('sequelize');

const CrudRepository = require('./crudRepository');
const { Flight, Airplane, Airport, City } = require('../models/index');
const { Logger } = require('../config');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        try {
            const flights = await Flight.findAll({
                where: filter,
                order: sort,
                include: [
                    {
                        model: Airplane,
                        required: true,
                        as: 'airplaneDetails'
                    },
                    {
                        model: Airport,
                        required: true,
                        as: 'departureAirport',
                        on: {
                            col1: Sequelize.where(Sequelize.col('Flight.departureAirportId'), "=", Sequelize.col('departureAirport.code'))
                        },
                        include: {
                            model: City,
                            required: true
                        }
                    },
                    {
                        model: Airport,
                        required: true,
                        as: 'arrivalAirport',
                        on: {
                            col1: Sequelize.where(Sequelize.col('Flight.arrivalAirportId'), "=", Sequelize.col('arrivalAirport.code'))
                        },
                        include: {
                            model: City,
                            required: true
                        }
                    }
                ]
            });
    
            return flights;
        } catch (error) {
            Logger.error('Error occured inside repository while fetching the flights!')
            throw error;
        }
    }
}

module.exports = FlightRepository;