"use strict";
const sequelize = require("sequelize");
const models = require("../models");

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.sequelize.transaction(async (transaction) => {

            return queryInterface.createTable(models.User.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: sequelize.INTEGER,
                },
                firstName: {
                    allowNull: false,
                    type: sequelize.STRING,
                },
                lastName: {
                    allowNull: false,
                    type: sequelize.STRING,
                },
                email: {
                    allowNull: false,
                    unique: true,
                    type: sequelize.STRING,
                },
                password: {
                    allowNull: false,
                    type: sequelize.STRING,
                },
                avatar: {
                    allowNull: true,
                    type: sequelize.STRING,
                },
                roleId: {
                    allowNull: false,
                    type: sequelize.INTEGER,
                    references: {
                        model: models.Role.tableName,
                        key: 'id'
                    }
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
            return queryInterface.dropTable(models.User.tableName, {
                transaction,
            });
        });
    },
};
