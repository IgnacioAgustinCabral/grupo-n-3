const { Transaction } = require("../database/models");
const { ErrorObject } = require("../helpers/error");

async function findAllTransaction() {
  return await Transaction.findAll();
}

async function createTransaction(newTransaction) {
  return await Transaction.create(newTransaction);
}

async function findOneTransaction(id) {
  const transaction = await Transaction.findByPk(id)
  if (!transaction) {
    throw new ErrorObject('Transaction not found', 404);
  }
  return transaction;
}

async function updateOneTransaction(body, id) {
  return await Transaction.update(body, { where: { id } });
}

async function deleteOneTransaction(id) {
  const transaction = await findOneTransaction(id)
  await transaction.destroy()
}

module.exports = {
  findAllTransaction,
  createTransaction,
  findOneTransaction,
  updateOneTransaction,
  deleteOneTransaction
};
