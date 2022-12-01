const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { findAllTransaction, createTransaction } = require("../services/transactionServices");

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

const postTransaction = catchAsync(async (req, res, next) => {
  const { userId, categoryId, amount, date, description } = req.body

  try {
    const transaction = await createTransaction({
      userId, categoryId, amount, date, description
    });
    endpointResponse({
      res,
      code: 201,
      body: transaction
    });
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving index] - [transactions - POST]: ${error.message}`
    );
    next(httpError);
  }
});

module.exports = {
  getAllTransactions,
  postTransaction
};