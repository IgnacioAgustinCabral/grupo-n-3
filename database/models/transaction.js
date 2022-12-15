"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, { foreignKey: "categoryId" });
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 1
 *         description: 
 *           type: string
 *           example: pago de servicio de luz  
 *         date:
 *           type: date
 *           example: 2022-12-14T19:21:55.000Z
 *         amount:
 *           type: decimal
 *           example: 1200
 *         userId:
 *           type: integer
 *           example: 1
 *         categoryId:
 *           type: integer
 *           example: 2
 */
  Transaction.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: "Transaction",
    },
  );
  return Transaction;
};
