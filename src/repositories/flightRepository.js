const { Sequelize } = require('sequelize');

const CrudRepository = require('./crudRepository');
const { Flight, Airplane, Airport, City } = require('../models/index');
const { Logger } = require('../config');
const { InternalServerError } = require('../errors');
const db = require('../models/index');
const { addRowLockOnFlights } = require('./queries');

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
            throw new InternalServerError('Some internal error occured while fetching the data');
        }
    }

    async updateRemainingSeats(flightId, seats, dec = true) {
        try {
            await db.sequelize.query(addRowLockOnFlights(flightId));
            const flight = await Flight.findByPk(flightId);

            if(parseInt(dec)) {
                await flight.decrement('totalSeats', {by: seats});
            } else {
                await flight.increment('totalSeats', {by: seats});
            }
            await flight.save();
            return flight;
        } catch (error) {
            Logger.error('Error occured inside repository while fetching the flights!')
            throw new InternalServerError('Some error occured while updating the data, Please try again');
        }
    }
}

module.exports = FlightRepository;