"use strict";
const sequelize = require("sequelize");
const models = require("../models");


module.exports = {
    up: async (queryInterface) => {
        await queryInterface.sequelize.transaction(async (transaction) => {

            return queryInterface.createTable(models.Role.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: sequelize.INTEGER,
                },
                name: {
                    allowNull: false,
                    type: sequelize.STRING,
                },
                description: {
                    allowNull: true,
                    type: sequelize.STRING,
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
            }, {

                transaction,
            });
        });
    },
    down: async (queryInterface) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            return queryInterface.dropTable(models.Role.tableName, {
                transaction,
            });
        });
    },
};
