"use strict";
const sequelize = require("sequelize");
const models = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(models.Transaction.tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      description: {
        type: sequelize.STRING,
      },
      date: {
        allowNull: false,
        type: sequelize.DATE,
      },
      amount: {
        allowNull: false,
        type: sequelize.DECIMAL,
      },
      userId: {
        allowNull: false,
        type: sequelize.INTEGER,
        references: {
          model: models.User.tableName,
          key: "id",
        },
      },
      categoryId: {
        allowNull: false,
        references: {
          model: models.Category.tableName,
          key: "id",
        },
        type: sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: sequelize.DATE,
      },

      deletedAt: {
        type: sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(models.Transaction.tableName);
  },
};
