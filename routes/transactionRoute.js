const express = require('express');
const {
    getAllTransactions,
    postTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByUserId
} = require('../controllers/transactionControllers');
const {
    validateRequestBySchema
} = require('../middlewares/validateRequestSchema');
const { postTransactionSchema } = require('../schemas/transactionSchemas');

const router = express.Router();

router.get('/userId', getTransactionsByUserId);
router.get('/', getAllTransactions);
router.get('/:id', getTransaction);
router.post('/', validateRequestBySchema(postTransactionSchema), postTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;