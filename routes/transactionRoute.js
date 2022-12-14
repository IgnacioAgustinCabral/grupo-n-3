const express = require("express");
const {
  getAllTransactions,
  postTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByUserId,
} = require("../controllers/transactionControllers");
const { isOwnerTransaction } = require("../middlewares/isOwnerTransaction");
const { isUserAuthenticated } = require("../middlewares/jwt");
const {
  validateRequestBySchema,
} = require("../middlewares/validateRequestSchema");
const { postTransactionSchema } = require("../schemas/transactionSchemas");

const router = express.Router();

router.get("/userId", isUserAuthenticated, getTransactionsByUserId);
router.get("/", isUserAuthenticated, getAllTransactions);
router.get("/:id", isUserAuthenticated, isOwnerTransaction, getTransaction);
router.post(
  "/",
  isUserAuthenticated,
  validateRequestBySchema(postTransactionSchema),
  postTransaction,
);
router.put("/:id", isUserAuthenticated, isOwnerTransaction, updateTransaction);
router.delete("/:id", isUserAuthenticated, isOwnerTransaction, deleteTransaction);

module.exports = router;