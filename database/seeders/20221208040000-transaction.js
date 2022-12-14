"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();

    await queryInterface.bulkInsert("transactions", [
      {
        id: 1,
        description: "pago de servicio de luz",
        date: new Date(),
        amount: 1200.23,
        userId: 1,
        categoryId: 2,
        createdAt: date,
        updatedAt: date,
      },
      {
        description: "cobro de honorarios",
        amount: 1888.29,
        date: new Date(),
        userId: 2,
        categoryId: 1,
        createdAt: date,
        updatedAt: date,
      },
      {
        description: "transferencia a amigo",
        amount: 500.97,
        date: new Date(),
        userId: 6,
        categoryId: 2,
        createdAt: date,
        updatedAt: date,
      },
      {
        description: "pago de servicio de gas",
        amount: 680.11,
        date: new Date(),
        userId: 5,
        categoryId: 2,
        createdAt: date,
        updatedAt: date,
      },
      {
        description: "sueldo",
        amount: 12900.5,
        date: new Date(),
        userId: 8,
        categoryId: 1,
        createdAt: date,
        updatedAt: date,
      },
      {
        description: "cobro de alquiler a inquilino",
        amount: 5000.5,
        date: new Date(),
        userId: 9,
        categoryId: 1,
        createdAt: date,
        updatedAt: date,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("transactions", null, {});
  },
};
