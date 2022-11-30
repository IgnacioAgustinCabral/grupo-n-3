const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { User } = require("../database/models");
const { findOrCreateUser } = require("../services/userServices");

module.exports = {
  getAllUsers: catchAsync(async (req, res, next) => {
    try {
      const users = await User.findAll({
        attributes: ["firstName", "lastName", "email", "createdAt"],
      });
      endpointResponse({
        res,
        message: "Users retrieved successfully",
        body: users,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving User] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
  getUser: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        const httpError = createHttpError("user not found", 404);
        return next(httpError);
      }
      endpointResponse({
        res,
        message: "User retrieved successfully",
        body: user,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving User] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
  createUser: catchAsync(async (req, res, next) => {
    try {
      const [user, created] = await findOrCreateUser(req.body);
      endpointResponse({
        res,
        message: created
          ? "User created"
          : "User with this email already exists!",
        body: created ? user : null,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving user] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
