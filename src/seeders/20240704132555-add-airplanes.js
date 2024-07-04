'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Airplanes', [
      {
        airplaneName: 'airbus340',
        capacity: 900,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneName: 'boeing777',
        capacity: 750,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'Airplanes', 
      {
        [Op.or]: [
          {airplaneName: 'boeing777'}, 
          {airplaneName: 'airbus340',}
        ]
    });
  }
};
