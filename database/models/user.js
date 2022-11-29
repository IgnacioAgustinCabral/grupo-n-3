"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Role, { through: "fk_Roles" });
        }
    }
    User.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            firstName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            lastName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            email: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            avatar: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            roleId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            }
        },
        {
            timestamps: true, // createdAt & updatedAt
            paranoid: true, // deletedAt
            sequelize,
            modelName: "User",
        }
    );
    return User;
};