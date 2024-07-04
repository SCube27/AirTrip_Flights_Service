const { StatusCodes } = require('http-status-codes');
const { Logger } = require('../config');
const { BadRequestError } = require('../errors/index');

function validateCreateRequest(req, res, next) {
    if(!req.body.airplaneName) {
        Logger.error("Bad request for creating airplane recieved.");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Airplane entry not created",
            error: new BadRequestError("airplaneName", "Model Name of airplane not provided"),
            data: {}
        });
    }
    next();
} 

module.exports = {
    validateCreateRequest,
}