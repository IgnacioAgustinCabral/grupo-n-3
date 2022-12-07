const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const {
  findAllTransaction,
  createTransaction,
  findOneTransaction,
  updateOneTransaction,
  deleteOneTransaction,
  findTransactionsByUserId,
} = require("../services/transactionServices");

const getAllTransactions = catchAsync(async (req, res, next) => {
  let { page = 0 } = req.query;
  try {
    const { count, rows, prevPage, nextPage } = await findAllTransaction(
      Number(page)
    );
    endpointResponse({
      res,
      code: 200,
      body: {
        total: count,
        prevPage,
        nextPage,
        transactions: rows,
      },
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
  const { userId, categoryId, amount, date, description } = req.body;
  try {
    const transaction = await createTransaction({
      userId,
      categoryId,
      amount,
      date,
      description,
    });
    endpointResponse({
      res,
      code: 201,
      body: transaction,
    });
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving index] - [transactions - POST]: ${error.message}`
    );
    next(httpError);
  }
});

const getTransaction = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await findOneTransaction(id);
    endpointResponse({
      res,
      message: "Transaction retrieved successfully",
      code: 200,
      body: transaction,
    });
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving transaction] - [transaction - GET]: ${error.message}`
    );
    next(httpError);
  }
});

const updateTransaction = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    await findOneTransaction(id);
    await updateOneTransaction(body, id);
    const updatedTransaction = await findOneTransaction(id);
    endpointResponse({
      res,
      message: "Transaction updated successfully",
      body: updatedTransaction,
    });
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error updating Transaction] - [transaction - PUT]: ${error.message}`
    );
    next(httpError);
  }
});

const deleteTransaction = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteOneTransaction(id);
    endpointResponse({
      res,
      code: 200,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error deleting Transaction] - [transaction - DELETE]: ${error.message}`
    );
    next(httpError);
  }
});

const getTransactionsByUserId = catchAsync(async (req, res, next) => {
  const { userId } = req.query;
  try {
    const transactionsByUserId = await findTransactionsByUserId(userId);
    endpointResponse({
      res,
      code: 200,
      body: transactionsByUserId,
    });
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving Transaction] - [transaction - GET]: ${error.message}`
    );
    next(httpError);
  }
});

module.exports = {
  getAllTransactions,
  postTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByUserId,
};
