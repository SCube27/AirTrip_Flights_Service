const CrudRepository = require("./crudRepository");
const { Airplane } = require('../models/index');

class AirplaneRepository extends CrudRepository {
    constructor() {
        super(Airplane);
    }
}

module.exports = AirplaneRepository;