'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [{
      name: 'Incomes',
      description: 'ingresos'
    },
    {
      name: 'Outcomes',
      description: 'egresos'
    }]);
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('categories', null, {});

  }
};
