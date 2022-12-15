const { Transaction } = require("../database/models");
const { ErrorObject } = require("../helpers/error");

async function findAllTransaction({ page, userId }) {
  let pageUrl = "http://localhost:3000/transactions?page=",
    prevPage = null,
    nextPage = null,
    limit = 10,
    offset = page * limit, //ex: page 0 * limit 10 = 0 - show since register 0-
    pages = 0; // quantity of pages

  let where = userId ? { userId } : {};

  const { count, rows } = await Transaction.findAndCountAll({
    offset,
    limit,
    where,
  });

  // ex: 12 registers / 10 limit = 2 pages in total - 1 because page initial value is 0
  pages = Math.ceil(count / limit) - 1;

  // actual page greater than 0 and actual page is less than  quantities of pages
  if (page > 0 && page <= pages) prevPage = `${pageUrl}${page - 1}`;

  // actual page is less than quantities of pages
  if (page < pages) nextPage = `${pageUrl}${page + 1}`;

  return { count, rows, prevPage, nextPage };
}

async function createTransaction(newTransaction) {
  return await Transaction.create(newTransaction);
}

async function findOneTransaction(id) {
  const transaction = await Transaction.findByPk(id);
  if (!transaction) {
    throw new ErrorObject("Transaction not found", 404);
  }
  return transaction;
}

async function updateOneTransaction(body, id) {
  return await Transaction.update(body, { where: { id } });
}

async function deleteOneTransaction(id) {
  const transaction = await findOneTransaction(id);
  await transaction.destroy();
}

async function findTransactionsByUserId(userId) {
  const transaction = await Transaction.findAll({ where: { userId } });
  if (transaction.length == 0) {
    throw new ErrorObject("Transactions by user ID not found", 404);
  }
  return transaction;
}

module.exports = {
  findAllTransaction,
  createTransaction,
  findOneTransaction,
  updateOneTransaction,
  deleteOneTransaction,
  findTransactionsByUserId,
};
