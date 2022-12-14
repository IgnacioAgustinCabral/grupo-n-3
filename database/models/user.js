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
            this.hasMany(models.Transaction, { foreignKey: 'userId' });
        }
    }

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 215
 *         firstName: 
 *           type: string
 *           example: Roberto  
 *         lastName:
 *           type: string
 *           example: Castillo
 *         email:
 *           type: string
 *           example: robert.castillo@gmail.com
 *         password:
 *           type: string
 *           example: 456123poiu.ghjk
 *         avatar:
 *           type: string
 *           example: TODO
 *         roleId:
 *           type: integer
 *           example: 2
 */
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
