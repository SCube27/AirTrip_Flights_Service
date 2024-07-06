const { StatusCodes } = require('http-status-codes');
const { Logger } = require('../config');
const { BadRequestError } = require('../errors/index');

function validateCreateRequest(req, res, next) {
    if(!req.body.citName) {
        Logger.error("Bad request for creating a new city entry recieved.");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "City entry not created",
            error: new BadRequestError("cityName", "Name of the city not present in the incoming request."),
            data: {}
        });
    }
    next();
} 

module.exports = {
    validateCreateRequest,
}