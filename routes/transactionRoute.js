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

/**
 * @swagger
 * /userId:
 *   get:
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get("/userId", isUserAuthenticated, getTransactionsByUserId);

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get("/", isUserAuthenticated, getAllTransactions);

/**
 * @swagger
 * /:id:
 *   get:
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get("/:id", isUserAuthenticated, isOwnerTransaction, getTransaction);

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.post(
  "/",
  isUserAuthenticated,
  validateRequestBySchema(postTransactionSchema),
  postTransaction,
);

/**
 * @swagger
 * /:id:
 *   put:
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.put("/:id", isUserAuthenticated, isOwnerTransaction, updateTransaction);

/**
 * @swagger
 * /:id:
 *   delete:
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.delete("/:id", isUserAuthenticated, isOwnerTransaction, deleteTransaction);

module.exports = router;
