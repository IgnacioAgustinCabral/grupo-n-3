const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { findAllTransaction } = require("../services/transactionServices");

const getAllTransactions = catchAsync(async (req, res, next) => {
  try {
    const transactions = await findAllTransaction();
    endpointResponse({
      res,
      code: 200,
      body: transactions,
    });
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving index] - [transactions - GET]: ${error.message}`
    );
    next(httpError);
  }
});

module.exports = {
  getAllTransactions,
};
