"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }
    Role.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                unique: true,
                allowNull: false,
                type: DataTypes.STRING,
            },
            description: {
                allowNull: true,
                type: DataTypes.STRING,
            }
        },
        {
            timestamps: true, // createdAt & updatedAt
            paranoid: true, // deletedAt
            sequelize,
            modelName: "Role",
        }
    );
    return Role;
};