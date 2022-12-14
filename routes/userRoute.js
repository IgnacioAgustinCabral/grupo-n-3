const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { uploadAvatar } = require("../middlewares/checkImage");
const { verifyIfOwnerOrAdmin } = require("../middlewares/verifyIfOwnerOrAdmin");
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
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
router.get("/", verifyIfOwnerOrAdmin, getAllUsers);

/**
 * @swagger
 * /users/:id:
 *   get:
 *     tags:
 *       - Users
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
router.get("/:id", verifyIfOwnerOrAdmin, getUser);

/**
 * @swagger
 * /users/create:
 *   post:
 *     tags:
 *       - Users
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
router.post("/create", uploadAvatar, createUser);

/**
 * @swagger
 * /users/:id:
 *   put:
 *     tags:
 *       - Users
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
router.put("/:id", verifyIfOwnerOrAdmin, updateUser);

/**
 * @swagger
 * /users/delete/:id:
 *   delete:
 *     tags:
 *       - Users
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
router.put("/delete/:id", verifyIfOwnerOrAdmin, deleteUser);

module.exports = router;
