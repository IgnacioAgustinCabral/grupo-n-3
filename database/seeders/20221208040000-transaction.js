'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('transactions', [
      {
        description: 'pago de servicio de luz',
        amount: 1200.23,
        userId: '1',
        categoryId: '2'
      },
      {
        description: 'cobro de honorarios',
        amount: 1888.29,
        userId: '2',
        categoryId: '1'
      },
      {
        description: 'transferencia a amigo',
        amount: 500.97,
        userId: '6',
        categoryId: '2'
      },
      {
        description: 'pago de servicio de gas',
        amount: 680.11,
        userId: '5',
        categoryId: '2'
      },
      {
        description: 'sueldo',
        amount: 12900.50,
        userId: '8',
        categoryId: '1'
      },
      {
        description: 'cobro de alquiler a inquilino',
        amount: 5000.50,
        userId: '9',
        categoryId: '1'
      }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transactions', null, {});
  }
};
