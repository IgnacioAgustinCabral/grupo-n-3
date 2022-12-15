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
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All users retrieved
 *         content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/User'
 */
router.get("/", verifyIfOwnerOrAdmin, getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User retrieved
 *         content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", verifyIfOwnerOrAdmin, getUser);

/**
 * @swagger
 * /users/create:
 *   post:
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error creating user
 */
router.post("/create", uploadAvatar, createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error updating user
 */
router.put("/:id", verifyIfOwnerOrAdmin, updateUser);

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.put("/delete/:id", verifyIfOwnerOrAdmin, deleteUser);

module.exports = router;
