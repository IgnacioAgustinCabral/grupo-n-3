const { Transaction } = require("../database/models");

async function findAllTransaction() {
  return await Transaction.findAll();
}

module.exports = {
  findAllTransaction,
};
