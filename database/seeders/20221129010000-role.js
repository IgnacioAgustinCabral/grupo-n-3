"use strict";
const models = require("../models");
module.exports = {
  up: async () => {
    const date = new Date();
    try {
      const defaultRoles = [
        {
          id: 1,
          name: "admin",
          description: "Administrator",
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 2,
          name: "user",
          description: "Normal user",
          createdAt: date,
          updatedAt: date,
        },
      ];

      await models.Role.bulkCreate(defaultRoles);
    } catch (error) {
      console.log(error);
    }
  },
  down: async (queryInterface) => {
    try {
      await queryInterface.bulkDelete(models.Role.tableName, {}, {});
    } catch (error) {
      console.log(error);
    }
  },
};
