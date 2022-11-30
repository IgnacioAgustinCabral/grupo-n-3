const createHttpError = require('http-errors');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const { User } = require('../database/models');

module.exports = {
	getAllUsers: catchAsync(async (req, res, next) => {
		try {
			const users = await User.findAll({
				attributes: ['firstName', 'lastName', 'email', 'createdAt'],
			});
			endpointResponse({
				res,
				message: 'Users retrieved successfully',
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
				const httpError = createHttpError('user not found', 404);
				return next(httpError);
			}
			endpointResponse({
				res,
				message: 'User retrieved successfully',
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
	updateUser: catchAsync(async (req, res, next) => {
		const { id } = req.params;
		const  body  = req.body;
		try {
			const user = await User.findByPk(id);
			if (!user) {
				const httpError = createHttpError('user not found', 404);
				return next(httpError);
			}
			await User.update(body, { where: { id } });
            //find updated user
            const updatedUser = await User.findByPk(id);
			endpointResponse({
				res,
				message: 'User updated successfully',
				body: updatedUser,
			});
		} catch (error) {
			const httpError = createHttpError(
				error.statusCode,
				`[Error updating User] - [index - PUT]: ${error.message}`
			);
			next(httpError);
		}
	}),
};
