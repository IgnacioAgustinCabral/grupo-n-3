const express = require('express');
const {
    getAllTransactions,
    postTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactionControllers');
const {
    validateRequestBySchema
} = require('../middlewares/validateRequestSchema');
const { postTransactionSchema } = require('../schemas/transactionSchemas');

const router = express.Router();

router.get('/', getAllTransactions);
router.post('/', validateRequestBySchema(postTransactionSchema), postTransaction);
router.get('/:id', getTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;