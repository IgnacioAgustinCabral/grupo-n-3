const express = require('express');
const { getAllTransactions, postTransaction } = require('../controllers/transactionControllers');
const { validateRequestBySchema } = require('../middlewares/validateRequestSchema');
const { postTransactionSchema } = require('../schemas/transactionSchemas');

const router = express.Router();

router.get('/', getAllTransactions);
router.post('/', validateRequestBySchema(postTransactionSchema), postTransaction)

module.exports = router;
