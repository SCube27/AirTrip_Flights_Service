const CrudRepository = require("./crudRepository");
const { City } = require('../models/index');

class CityRepository extends CrudRepository {
    constructor() {
        super(City);
    }
}

module.exports = CityRepository;