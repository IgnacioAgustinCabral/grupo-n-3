const express = require("express");
const {
  allCategories,
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { isUserAuthenticated } = require("../middlewares/jwt");
const { isAdminRole } = require("../middlewares/isAdminRole");
const {
  validateRequestBySchema,
} = require("../middlewares/validateRequestSchema");
const categorySchema = require("../schemas");
const router = express.Router();

router.use(isUserAuthenticated);

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All categories retrieved
 *         content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Category'
 */
router.get('/', allCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category retrieved
 *         content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */
router.get('/:id', getCategory);

/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error creating category
 */
router.post('/', isAdminRole, validateRequestBySchema(categorySchema), postCategory)

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags: [Categories]
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
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error updating category
 */
router.put('/:id', isAdminRole, validateRequestBySchema(categorySchema), updateCategory)

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
router.delete('/:id', isAdminRole, deleteCategory)

module.exports = router