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
 * /transactions/userId:
 *   get:
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: OK
 *     security:
 *       - bearerAuth: []
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
 * /transactions:
 *   get:
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: OK
 *     security:
 *       - bearerAuth: []
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
 * /transactions/:id:
 *   get:
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: OK
 *     security:
 *       - bearerAuth: []
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
 * /transactions:
 *   post:
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: OK
 *     security:
 *       - bearerAuth: []
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
 * /transactions/:id:
 *   put:
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: OK
 *     security:
 *       - bearerAuth: []
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
 * /transactions/:id:
 *   delete:
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: OK
 *     security:
 *       - bearerAuth: []
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
