const express = require('express');
const { getAllTransactions, postTransaction } = require('../controllers/transactionControllers');

const router = express.Router();

router.get('/', getAllTransactions);
router.post('/', postTransaction)

module.exports = router;
