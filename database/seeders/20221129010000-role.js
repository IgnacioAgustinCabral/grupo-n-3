"use strict";
const models = require("../models");
module.exports = {
    up: async () => {

        try {
            const defaultRoles = [
                {
                    name: 'admin',
                    description: 'Administrator',
                },
                {
                    name: 'user',
                    description: 'Normal user',
                },
            ];

            await models.Role.bulkCreate(defaultRoles);
        }
        catch (error) {
            console.log(error);
        }

    },
    down: async (queryInterface) => {

        try {
            await queryInterface.bulkDelete(models.Role.tableName, {}, {});
        }
        catch (error) {
            console.log(error);
        }

    },
};
