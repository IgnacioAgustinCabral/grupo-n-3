const { Transaction } = require("../database/models");

async function findAllTransaction() {
  return await Transaction.findAll();
}

async function createTransaction(newTransaction) {
  return await Transaction.create(newTransaction);
}

module.exports = {
  findAllTransaction,
  createTransaction
};
