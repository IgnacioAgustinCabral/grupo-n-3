"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();
    await queryInterface.bulkInsert("categories", [
      {
        id: 1,
        name: "Incomes",
        description: "ingresos",
        createdAt: date,
        updatedAt: date,
      },
      {
        id: 2,
        name: "Outcomes",
        description: "egresos",
        createdAt: date,
        updatedAt: date,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
