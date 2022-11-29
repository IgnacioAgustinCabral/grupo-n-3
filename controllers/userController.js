const createHttpError = require('http-errors');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const { User } = require('../database/models');

module.exports = {
	getAllUsers: catchAsync(async (req, res, next) => {
		try {
			const users = await User.findAll({attributes:['firstName','lastName','email','createdAt']});
			endpointResponse({
				res,
				message: 'Test retrieved successfully',
				body: users
			});
		} catch (error) {
			const httpError = createHttpError(
				error.statusCode,
				`[Error retrieving index] - [index - GET]: ${error.message}`
			);
			next(httpError);
		}
	}),
};
