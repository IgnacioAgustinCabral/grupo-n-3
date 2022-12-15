const express = require("express");
const {
  getAllTransactions,
  postTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
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
 * /transactions:
 *   get:
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: userId
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: All transactions retrieved
 *         content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Transaction'
 */
router.get("/", isUserAuthenticated, getAllTransactions);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction retrieved
 *         content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 */
router.get("/:id", isUserAuthenticated, isOwnerTransaction, getTransaction);

/**
 * @swagger
 * /transactions:
 *   post:
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error creating Transaction
 */
router.post(
  "/",
  isUserAuthenticated,
  validateRequestBySchema(postTransactionSchema),
  postTransaction,
);

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transaction updated
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error updating transaction
 */
router.put("/:id", isUserAuthenticated, isOwnerTransaction, updateTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction deleted
 *       404:
 *         description: Transaction not found
 */
router.delete(
  "/:id",
  isUserAuthenticated,
  isOwnerTransaction,
  deleteTransaction,
);

module.exports = router;
