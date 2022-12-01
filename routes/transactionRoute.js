const express = require('express');
const {
    getAllTransactions,
    postTransaction,
    getTransaction
} = require('../controllers/transactionControllers');
const {
    validateRequestBySchema
} = require('../middlewares/validateRequestSchema');
const { postTransactionSchema } = require('../schemas/transactionSchemas');

const router = express.Router();

router.get('/', getAllTransactions);
router.post('/', validateRequestBySchema(postTransactionSchema), postTransaction);
router.get('/:id', getTransaction);

module.exports = router;